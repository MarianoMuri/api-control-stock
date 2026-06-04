import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";

import routes from "./routes/index.js";
import swaggerSpec from "./config/swagger.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

app.use("/api", routes);

app.get("/", (req, res) => {
    res.send("API de Inventario y Control de Stock");
});

export default app;