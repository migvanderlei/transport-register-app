import BlockchainRepository from "../../infra/repository/BlockchainRepository";
import { Request, Response } from "express";

export default class BlockchainController {
  static async handleGet(req: Request, res: Response) {
    const repository = new BlockchainRepository();

    const isValid = repository.blockchain.isValidBlockchain();

    return res
      .status(200)
      .json({
        isValid,
        message: isValid ? "Blockchain is valid!" : "Blockchain is invalid!",
        blockchain: repository.blockchain,
      })
      .send();
  }

  static async handleDelete(req: Request, res: Response) {
    const repository = new BlockchainRepository();

    const blockchain = repository.restartBlockchain();

    return res
      .status(200)
      .json({
        message: "Blockchain was restarted",
        blockchain: blockchain,
      })
      .send();
  }
}
