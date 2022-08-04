import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import Blockchain from "./infra/blockchain/Blockchain";
import EnvioController from "./domain/controller/EnvioController";

dotenv.config();

const app: Express = express();
app.use(express.json());

const port = process.env.PORT;

app.get("/envio/:id", EnvioController.handleGet);

app.post("/envio", EnvioController.handlePost);

app.put("/envio/:id", EnvioController.handlePut);

app.get("/envios", EnvioController.handleListGet);

app.get("/blockchain", (req: Request, res: Response) => {
  const blockchain = Blockchain.getInstance();

  if (blockchain.isValidBlockchain()) {
    res.send('<p> Blockchain is <b>valid</b>! </p><br/>' + blockchain);
  } else {
    res.send('<p> Blockchain is <b>invalid</b>! </p><br/>' + blockchain)
  }

});

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
