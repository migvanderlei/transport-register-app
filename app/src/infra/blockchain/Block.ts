import { createHash } from "crypto";

export default class Block {
  private index: number;
  private timestamp: Date;
  private hash: string;
  private previousHash: string | undefined;
  private data: string;
  private nonce: number;

  constructor(
    index: number,
    timestamp: Date,
    previousHash: string | undefined,
    data: string
  ) {
    this.index = index;
    this.timestamp = timestamp;
    this.previousHash = previousHash;
    this.data = data;
    this.nonce = 0;
    this.hash = Block.calculateHash(this);
  }

  public getIndex(): number {
    return this.index;
  }

  public getTimestamp(): Date {
    return this.timestamp;
  }

  public getHash(): string {
    return this.hash;
  }

  public getPreviousHash(): string | undefined {
    return this.previousHash;
  }

  public getData(): string {
    return this.data;
  }

  public str(): string {
    return `${this.index}${this.timestamp}${this.previousHash}${this.data}${this.nonce}`;
  }

  public toString(): string {
    // formata o objeto como um JSON, com dois espaços para formatação
    return JSON.stringify(this, null, 2);
  }

  public static calculateHash(block: Block): string {
    // obtem os dados em string e gera um hash a partir do SHA256, formatado em hexadecimal
    const txt = block.str();
    return createHash("SHA256").update(txt).digest("hex");
  }

  public proofOfWork(difficulty: number) {
    this.nonce = 0;

    // executa enquanto a parte inicial da string que representa a dificuldade não tiver a quantidade necessária de zeros 
    while (
      !this.getHash()
        .substring(0, difficulty)
        .startsWith("0".repeat(difficulty))
    ) {
      this.nonce++;
      this.hash = Block.calculateHash(this);
    }
  }
}
