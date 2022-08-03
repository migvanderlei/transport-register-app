import Block from "./Block";

export default class Blockchain {
  private difficulty: number;
  private blocks: Block[];

  private static _instance: Blockchain;

  public static getInstance(): Blockchain
    {
        return this._instance || (this._instance = new this(4));
    };

  private constructor(difficulty: number) {
    this.difficulty = difficulty;

    this.blocks = [];

    // criando o primeiro bloco e incluindo na Blockchain
    const b = new Block(0, new Date(), undefined, "Block genesis");
    b.proofOfWork(difficulty);
    this.blocks.push(b);
  }

  public getDifficulty(): number {
    return this.difficulty;
  }

  public latestBlock(): Block {
    // a exclamação serve para garantir ao compilador que o método nunca retornará undefined (non-null assertion)
    return this.blocks[this.blocks.length - 1];
  }

  public findBlock(hash: string): Block | undefined{
    for (const block of this.blocks) {
      if (block.getHash() == hash) {
        return block;
      }
      return undefined;
    }
  }

  public newBlock(data: string): Block {
    const latestBlock = this.latestBlock();
    return new Block(
      latestBlock.getIndex() + 1,
      new Date(),
      latestBlock.getHash(),
      data
    );
  }

  public addBlock(b: Block) {
    if (b != undefined) {
      b.proofOfWork(this.difficulty);
      this.blocks.push(b);
    }
  }

  public isFirstBlockValid(): boolean {
    const firstBlock = this.blocks[0];

    if(!firstBlock) {
      return false;
    }

    if (firstBlock.getIndex() != 0) {
      return false;
    }

    if (firstBlock.getPreviousHash() != undefined) {
      return false;
    }

    if (
      firstBlock.getHash() == undefined ||
      !(Block.calculateHash(firstBlock) == firstBlock.getHash())
    ) {
      return false;
    }

    return true;
  }

  public isValidNewBlock(
    newBlock: Block | undefined,
    previousBlock: Block | undefined
  ): boolean {
    if (newBlock != undefined && previousBlock != undefined) {
      if (previousBlock.getIndex() + 1 != newBlock.getIndex()) {
        return false;
      }

      if (
        newBlock.getPreviousHash() == undefined ||
        !(newBlock.getPreviousHash() == previousBlock.getHash())
      ) {
        return false;
      }

      if (
        newBlock.getHash() == undefined ||
        !(Block.calculateHash(newBlock) == newBlock.getHash())
      ) {
        return false;
      }

      return true;
    }
    return false;
  }

  public isValidBlockchain() {
    if (!this.isFirstBlockValid()) {
      return false;
    }

    for (let i = 1; i < this.blocks.length; i++) {
      const currentBlock = this.blocks[i];
      const previousBlock = this.blocks[i - 1];

      if (!this.isValidNewBlock(currentBlock, previousBlock)) {
        return false;
      }
    }
    return true;
  }

  public toString() {
    // formata o objeto como um JSON, com dois espaços para formatação
    return JSON.stringify(this, null, 2);
  }
}
