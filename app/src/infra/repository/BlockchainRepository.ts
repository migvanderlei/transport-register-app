import Blockchain from "../blockchain/Blockchain";
import Block from "../blockchain/Block";
import Envio from "../../domain/entity/Envio";

export default class BlockchainRepository {
  blockchain: Blockchain;

  constructor(blockchain: Blockchain) {
    this.blockchain = blockchain;
  }

  storeBlock(data: Envio): Block {
    const newBlock: Block = this.blockchain.newBlock(JSON.stringify(data));

    const latestBlock = this.blockchain.latestBlock();

    if (this.blockchain.isValidNewBlock(newBlock, latestBlock)) {
      this.blockchain.addBlock(newBlock);
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
      previousHash = block.getPreviousHash();
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

    while (previousHash != undefined) {
      let data = (JSON.parse(block.getData()) as Envio) || undefined;
      // como estamos iterando do bloco mais recente até o começo (navegando pelo previousHash)
      // o primeiro bloco que eu encontrar com um id que ainda não estiver na lista
      // é a versão mais recente daquele envio
      // guarda o id e o bloco
      if (!foundBlocksIds.has(data.id)) {
        foundBlocksIds.add(data.id);
        foundBlocks.push(block);
      }

      block = this.blockchain.findBlock(previousHash)!;

      if (!block) {
        previousHash = undefined
      } else {
        previousHash = block.getPreviousHash();
      }
    }

    return foundBlocks;
  }

  // compareParameters(properties: Record<string, any>, data: any) {
  //   let countMatches = 0;

  //   for (const property of Object.keys(properties)) {
  //     const value = properties[property];
  //     if (data[property] && data[property] == value) {
  //       countMatches++;
  //     }
  //   }

  //   if (countMatches == Object.keys(properties).length) {
  //     return true;
  //   }

  //   return false;
  // }
}
