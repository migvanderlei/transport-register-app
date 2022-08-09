import Blockchain from "../../infra/blockchain/Blockchain";
import BlockchainRepository from "../../infra/repository/BlockchainRepository";
import { Request, Response } from "express";
import Envio from "../entity/Envio";

export default class EnvioController {
  static handleGet(req: Request, res: Response) {
    const id = req.params.id;

    const repository = new BlockchainRepository();
    let data;
    const block = repository.findBlockById(id);
    if (block && block.getData()) {
      try {
        data = JSON.parse(block.getData()) as Envio;
      } catch {
        return res
          .status(500)
          .json({ status: 500, reason: "Could not parse data from string" });
      }
      return res.json(data);
    }
    return res.status(404).json({ status: 404, reason: "Not found" });
  }

  static handlePost(req: Request, res: Response) {
    const data = req.body as Envio;

    const repository = new BlockchainRepository();

    const block = repository.storeBlock(data);

    const responseData = {
      hash: block.getHash(),
      previousHash: block.getPreviousHash(),
      index: block.getIndex(),
    };

    return res.status(201).json(responseData);
  }

  static handleListGet(req: Request, res: Response) {
    const repository = new BlockchainRepository();

    const blocks = repository.findCurrentBlocks();

    return res.status(200).json(blocks);
  }

  static handlePut(req: Request, res: Response) {
    const data = req.body as Envio;
    const id = req.params.id;

    const repository = new BlockchainRepository();

    const originalBlock = repository.findBlockById(id);

    if (originalBlock) {
      const newBlock = repository.storeBlock(data);
      const responseData = {
        currentVersion: {
          hash: newBlock.getHash(),
          previousHash: newBlock.getPreviousHash(),
          index: newBlock.getIndex(),
        },
        previousVersion: {
          hash: originalBlock.getHash(),
          previousHash: originalBlock.getPreviousHash(),
          index: originalBlock.getIndex(),
        },
        data: data,
      };
      return res.status(200).json(responseData);
    }
    return res.status(404).json({ status: 404, reason: "Not found" });
  }
}
