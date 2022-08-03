import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import Blockchain from "./infra/blockchain/Blockchain";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/envio", (req: Request, res: Response) => {
  res.send("Transport Register App");
});

app.post("/envio", (req: Request, res: Response) => {
  res.send("Transport Register App");
});

app.put("/envio", (req: Request, res: Response) => {
  res.send("Transport Register App");
});

app.get("/envios", (req: Request, res: Response) => {
  res.send("Transport Register App");
});

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
