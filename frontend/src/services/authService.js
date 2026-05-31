const API_URL = import.meta.env.VITE_API_URL;

export const login = async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error("Credenciales incorrectas");
    }

    const data = await response.json();

    localStorage.setItem("token", data.token);
    localStorage.setItem("usuario", JSON.stringify(data.usuario));

    return data;
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
};

export const getToken = () => {
    return localStorage.getItem("token");
};

export const getUsuario = () => {
    const usuario = localStorage.getItem("usuario");
    return usuario ? JSON.parse(usuario) : null;
};

export const estaAutenticado = () => {
    return !!localStorage.getItem("token");
};