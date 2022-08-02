import Endereco from "../interface/Endereco";

export default class Destinatario {
    endereco: Endereco
    nome: string
    conta: string

  constructor(endereco: Endereco, nome: string, conta: string) {
    this.endereco = endereco
    this.nome = nome
    this.conta = conta
  } 
}