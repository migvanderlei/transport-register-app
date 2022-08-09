import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

import EnvioController from "./domain/controller/EnvioController";
import BlockchainController from "./domain/controller/BlockchainController";

dotenv.config();

const app: Express = express();

app.use(cors())
app.use(express.json());


const port = process.env.PORT || 8080;

app.get("/envio/:id", EnvioController.handleGet);

app.post("/envio", EnvioController.handlePost);

app.put("/envio/:id", EnvioController.handlePut);

app.get("/envios", EnvioController.handleListGet);

app.get("/blockchain", BlockchainController.handleGet);
app.get("/blockchain/delete", BlockchainController.handleDelete);

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
