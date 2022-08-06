import { readFileSync, writeFileSync } from "fs";
import path from "path";
import Blockchain from "../blockchain/Blockchain";
import Block from "../blockchain/Block";
import Envio from "../../domain/entity/Envio";
import BlockchainAdapter from "../../adapter/BlockchainAdapter";

const blockchainFile = "../blockchain/blockchain.json";

export default class BlockchainRepository {
  blockchain: Blockchain;

  constructor() {
    this.blockchain = this.loadBlockchain();
  }

  storeBlock(data: Envio): Block {
    const newBlock: Block = this.blockchain.newBlock(JSON.stringify(data));

    const latestBlock = this.blockchain.latestBlock();

    if (this.blockchain.isValidNewBlock(newBlock, latestBlock)) {
      this.blockchain.addBlock(newBlock);
      this.persistBlockchain();
      return newBlock;
    } else {
      return this.storeBlock(data);
    }
  }

  findBlockById(id: string): Block | undefined {
    let block = this.blockchain.latestBlock();
    let previousHash = block.getPreviousHash();

    while (previousHash != undefined) {
      let data = (JSON.parse(block.getData()) as Envio) || undefined;
      if (data.id == id) {
        return block;
      }

      block = this.blockchain.findBlock(previousHash)!;
      if (block) {
        previousHash = block.getPreviousHash();
      } else {
        previousHash = undefined;
      }
    }

    return undefined;
  }

  findCurrentBlocks(): Block[] {
    // instanciando um conjunto de strings que não se repetem
    const foundBlocksIds = new Set<string>();
    // instanciando um array vazio do tipo Block[]
    const foundBlocks: Block[] = [];
    let block = this.blockchain.latestBlock();
    let previousHash = block.getPreviousHash();
    
    console.log(block)
    while (previousHash != undefined) {
      let data = (JSON.parse(block.getData()) as Envio) || undefined;
      // como estamos iterando do bloco mais recente até o começo (navegando pelo previousHash)
      // o primeiro bloco que eu encontrar com um id que ainda não estiver na lista
      // é a versão mais recente daquele envio
      // guarda o id e o bloco
      console.log('bloco:', data);
      if (!foundBlocksIds.has(data.id)) {
        foundBlocksIds.add(data.id);
        foundBlocks.push(block);
      }
      console.log(foundBlocksIds)

      console.log(previousHash)
      block = this.blockchain.findBlock(previousHash)!;

      console.log(block)

      if (!block) {
        previousHash = undefined;
      } else {
        previousHash = block.getPreviousHash();
      }
    }

    return foundBlocks;
  }

  persistBlockchain() {
    const data = JSON.stringify(this.blockchain);
    writeFileSync(path.resolve(__dirname, blockchainFile), data);
  }

  restartBlockchain(): Blockchain {
    const data = JSON.stringify(Blockchain.recreateInstance());
    writeFileSync(path.resolve(__dirname, blockchainFile), data);
    return Blockchain.getInstance();
  }

  loadBlockchain(): Blockchain {
    const rawData = readFileSync(path.resolve(__dirname, blockchainFile));

    try {
      const rawJsonData = JSON.parse(rawData.toString());
      const blockchainFromJson = BlockchainAdapter.adaptFromJson(rawJsonData);
      return blockchainFromJson;
    } catch (e) {
      console.error(e)
      return this.restartBlockchain();
    }
  }
}
