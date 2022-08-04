import Blockchain from "@/infra/blockchain/Blockchain";
import BlockchainRepository from "@/infra/repository/BlockchainRepository";
import { Request, Response } from "express";
import Envio from "../entity/Envio";

export default class EnvioController {
  static async handleGet(req: Request, res: Response) {
    const id = req.params.id;

    const blockchain = Blockchain.getInstance();
    const repository = new BlockchainRepository(blockchain);

    const block = repository.findBlockById(id);
    if (block && block.getData()) {
      try {
        const data = JSON.parse(block.getData()) as Envio;
        return res.json(data).send();
      } catch {
        return res
          .status(500)
          .json({ status: 500, reason: "Could not parse data from string" })
          .send();
      }
    }
    return res.status(404).json({ status: 404, reason: "Not found" }).send();
  }

  static async handlePost(req: Request, res: Response) {
    const data = req.body as Envio;

    const blockchain = Blockchain.getInstance();
    const repository = new BlockchainRepository(blockchain);

    const block = repository.storeBlock(data);

    const responseData = {
      hash: block.getHash(),
      previousHash: block.getPreviousHash(),
      index: block.getIndex(),
    };

    return res.status(201).json(responseData).send();
  }
}
