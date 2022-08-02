import Address from "../interface/Address";

export default class Remetente {
    endereco: Address
    nome: string
    conta: string

  constructor(endereco: Address, nome: string, conta: string) {
    this.endereco = endereco
    this.nome = nome
    this.conta = conta
  } 
}