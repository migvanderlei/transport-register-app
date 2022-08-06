import Block from "@/infra/blockchain/Block";
import Blockchain from "@/infra/blockchain/Blockchain";

export default class BlockchainAdapter {
  static adaptFromJson(data: Record<string, any>): Blockchain {
    const { difficulty } = data;
    const blocks: Block[] = [];

    for (const rawBlock of data.blocks || []) {
      const { index, timestamp, previousHash, data, nonce } = rawBlock;
  
      const block = new Block(
        index,
        timestamp,
        previousHash,
        data,
        nonce
      );

      blocks.push(block);
    }

    return Blockchain.recreateFromFile(difficulty, blocks);
  }
}
