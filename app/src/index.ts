import Block from "../infra/blockchain/Block";
import Blockchain from "../infra/blockchain/Blockchain";

const blockchain = new Blockchain(4);
blockchain.addBlock(blockchain.newBlock("Tout sur le Bitcoin"));
blockchain.addBlock(blockchain.newBlock("Sylvain Saurel"));
blockchain.addBlock(blockchain.newBlock("https://www.toutsurlebitcoin.fr"));

console.log(blockchain);
console.log(`A blockchain é válida? ${blockchain.isValidBlockchain()? "Sim": "Não"}\n`);

// adicionando um bloco inválido que corrompe a blockchain
blockchain.addBlock(new Block(15, new Date(), "aaaabbb", "Block invalid"));
console.log(blockchain);
console.log(`A blockchain é válida? ${blockchain.isValidBlockchain()? "Sim": "Não"}\n`);
