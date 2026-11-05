// Tests de integración de la API contra una base PostgreSQL real.
// Usan el runner nativo de Node (node:test) y fetch: no hacen falta dependencias extra.
// Requieren una base vacía: la conexión sale de DATABASE_URL o de DB_* (ver .env.example).
// ¡Ojo! Las tablas se recrean (sync force), nunca apuntar a una base con datos reales.
import { test, before, after, describe } from "node:test";
import assert from "node:assert/strict";

process.env.JWT_SECRET ||= "test-secret";
process.env.ADMIN_EMAIL = "admin@test.com";
process.env.ADMIN_PASSWORD = "admin123";

const { default: app } = await import("../src/app.js");
const { sequelize } = await import("../src/config/database.js");
const { setupAssociations, Usuario } = await import("../src/models/index.js");
const { crearAdminInicial } = await import("../src/seeders/adminSeeder.js");
const { default: bcrypt } = await import("bcryptjs");

let server;
let base;
let tokenMaster;
let tokenCajero;

const api = async (method, path, { token, body } = {}) => {
    const res = await fetch(base + path, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: body ? JSON.stringify(body) : undefined,
    });
    const data = await res.json().catch(() => null);
    return { status: res.status, data };
};

const login = async (email, password) => (await api("POST", "/api/auth/login", { body: { email, password } }));

before(async () => {
    setupAssociations();
    await sequelize.sync({ force: true });
    await crearAdminInicial();
    await Usuario.create({
        nombre: "Cajero de prueba",
        email: "cajero@test.com",
        password: await bcrypt.hash("cajero123", 10),
        rol: "cajero",
    });

    server = app.listen(0);
    await new Promise((resolve) => server.once("listening", resolve));
    base = `http://127.0.0.1:${server.address().port}`;

    tokenMaster = (await login("admin@test.com", "admin123")).data.token;
    tokenCajero = (await login("cajero@test.com", "cajero123")).data.token;
});

after(async () => {
    await new Promise((resolve) => server.close(resolve));
    await sequelize.close();
});

describe("Autenticación", () => {
    test("login correcto devuelve token y datos del usuario sin la contraseña", async () => {
        const { status, data } = await login("admin@test.com", "admin123");
        assert.equal(status, 200);
        assert.ok(data.token);
        assert.equal(data.usuario.rol, "master");
        assert.equal(data.usuario.password, undefined);
    });

    test("contraseña incorrecta devuelve 401", async () => {
        const { status } = await login("admin@test.com", "incorrecta");
        assert.equal(status, 401);
    });

    test("email inexistente devuelve 401 con el mismo mensaje", async () => {
        const mal = await login("admin@test.com", "incorrecta");
        const inexistente = await login("nadie@test.com", "admin123");
        assert.equal(inexistente.status, 401);
        assert.equal(inexistente.data.mensaje, mal.data.mensaje);
    });

    test("faltan campos devuelve 400", async () => {
        const { status } = await api("POST", "/api/auth/login", { body: { email: "admin@test.com" } });
        assert.equal(status, 400);
    });

    test("ruta protegida sin token devuelve 401", async () => {
        const { status } = await api("GET", "/api/productos");
        assert.equal(status, 401);
    });

    test("token inválido devuelve 401", async () => {
        const { status } = await api("GET", "/api/productos", { token: "no-es-un-jwt" });
        assert.equal(status, 401);
    });
});

describe("Permisos por rol", () => {
    test("el cajero puede ver productos", async () => {
        const { status } = await api("GET", "/api/productos", { token: tokenCajero });
        assert.equal(status, 200);
    });

    test("el cajero no puede crear categorías", async () => {
        const { status } = await api("POST", "/api/categorias", { token: tokenCajero, body: { nombre: "No debería" } });
        assert.equal(status, 403);
    });

    test("el cajero no puede ver usuarios", async () => {
        const { status } = await api("GET", "/api/usuarios", { token: tokenCajero });
        assert.equal(status, 403);
    });

    test("el cajero no puede eliminar movimientos", async () => {
        const { status } = await api("DELETE", "/api/movimientos/1", { token: tokenCajero });
        assert.equal(status, 403);
    });

    test("el master puede ver usuarios y la respuesta no incluye contraseñas", async () => {
        const { status, data } = await api("GET", "/api/usuarios", { token: tokenMaster });
        assert.equal(status, 200);
        assert.ok(data.length >= 2);
        for (const u of data) assert.equal(u.password, undefined);
    });

    test("crear usuario con contraseña corta devuelve 400", async () => {
        const { status } = await api("POST", "/api/usuarios", {
            token: tokenMaster,
            body: { nombre: "Nuevo", email: "nuevo@test.com", password: "123" },
        });
        assert.equal(status, 400);
    });
});

describe("Movimientos de stock", () => {
    let idProducto;

    const stockActual = async () =>
        (await api("GET", `/api/productos/${idProducto}`, { token: tokenMaster })).data.stock;

    const mover = (tipo, cantidad, id = idProducto, token = tokenCajero) =>
        api("POST", "/api/movimientos", { token, body: { tipo, cantidad, id_producto: id } });

    before(async () => {
        const cat = await api("POST", "/api/categorias", { token: tokenMaster, body: { nombre: "Bebidas" } });
        assert.equal(cat.status, 201);
        const prod = await api("POST", "/api/productos", {
            token: tokenMaster,
            body: { nombre: "Agua 1,5 L", precio: 1100, stock: 10, id_categoria: cat.data.id },
        });
        assert.equal(prod.status, 201);
        idProducto = prod.data.id;
    });

    test("un ingreso suma al stock", async () => {
        const { status } = await mover("ingreso", 5);
        assert.equal(status, 201);
        assert.equal(await stockActual(), 15);
    });

    test("un egreso resta del stock", async () => {
        const { status } = await mover("egreso", 4);
        assert.equal(status, 201);
        assert.equal(await stockActual(), 11);
    });

    test("un egreso mayor al stock se rechaza y el stock no cambia", async () => {
        const { status, data } = await mover("egreso", 50);
        assert.equal(status, 400);
        assert.equal(data.mensaje, "Stock insuficiente");
        assert.equal(await stockActual(), 11);
    });

    test("se puede egresar exactamente todo el stock y queda en 0", async () => {
        const { status } = await mover("egreso", 11);
        assert.equal(status, 201);
        assert.equal(await stockActual(), 0);
    });

    test("cantidad negativa o cero se rechaza", async () => {
        assert.equal((await mover("ingreso", -3)).status, 400);
        assert.equal((await mover("ingreso", 0)).status, 400);
        assert.equal(await stockActual(), 0);
    });

    test("tipo inválido se rechaza", async () => {
        const { status } = await mover("robo", 1);
        assert.equal(status, 400);
    });

    test("producto inexistente devuelve 404", async () => {
        const { status } = await mover("ingreso", 1, 999999);
        assert.equal(status, 404);
    });

    test("el movimiento queda registrado con el usuario que lo hizo", async () => {
        const { status, data } = await api("GET", "/api/movimientos/historico?tipo=ingreso", { token: tokenMaster });
        assert.equal(status, 200);
        assert.ok(data.length >= 1);
        assert.ok(data.every((m) => m.tipo === "ingreso"));
        assert.equal(data[0].usuario.email, "cajero@test.com");
        assert.equal(data[0].usuario.password, undefined);
    });

    test("egresos simultáneos no dejan el stock inconsistente", async () => {
        await mover("ingreso", 10);
        assert.equal(await stockActual(), 10);

        const respuestas = await Promise.all(Array.from({ length: 5 }, () => mover("egreso", 8)));
        const aprobados = respuestas.filter((r) => r.status === 201).length;

        assert.equal(aprobados, 1);
        assert.equal(await stockActual(), 2);
    });

    test("filtro de histórico con tipo inválido devuelve 400", async () => {
        const { status } = await api("GET", "/api/movimientos/historico?tipo=otro", { token: tokenMaster });
        assert.equal(status, 400);
    });
});
