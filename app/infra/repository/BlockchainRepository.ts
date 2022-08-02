import Blockchain from "../blockchain/Blockchain";
import Block from "../blockchain/Block";

export default class BlockchainRepository {
  blockchain: Blockchain;

  constructor(blockchain: Blockchain) {
    this.blockchain = blockchain;
  }

  storeBlock(data: any) {
    const newBlock: Block = this.blockchain.newBlock(JSON.stringify(data));
    const latestBlock = this.blockchain.latestBlock();

    if (this.blockchain.isValidNewBlock(newBlock, latestBlock)) {
      this.blockchain.addBlock(newBlock);
      return newBlock;
    } else {
      return this.storeBlock(data);
    }
  }

  findBlockByHash(hash: string) {
    return this.blockchain.findBlock(hash);
  }

  findBlocks(properties: Record<string, any>) {
    const result: Block[] = [];
    let block = this.blockchain.latestBlock();
    let previousHash = block.getPreviousHash();
    let data = JSON.parse(block.getData()) || {};

    while (previousHash != undefined) {
      if (this.compareParameters(properties, data)) {
        result.push(block);
      }

      block = this.blockchain.findBlock(previousHash)!;
    }

    return result;
  }

  compareParameters(properties: Record<string, any>, data: any) {
    let countMatches = 0;

    for (const property of Object.keys(properties)) {
      const value = properties[property];
      if (data[property] && data[property] == value) {
        countMatches++;
      }
    }

    if (countMatches == Object.keys(properties).length) {
      return true;
    }

    return false;
  }
}
