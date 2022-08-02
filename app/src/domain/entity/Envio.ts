import Pacote from "./Pacote";
import Trecho from "./Trecho";

export default class Envio {
    hash: string
    pacotes: Pacote[]
    dataDeCriacao: Date
    previsaoDeEntrega: Date
    trechos: Trecho[]


  constructor(
    hash: string,
    dataDeCriacao: Date, 
    previsaoDeEntrega: Date, 
) {
    this.hash = hash
    this.dataDeCriacao = dataDeCriacao
    this.previsaoDeEntrega = previsaoDeEntrega
    this.trechos = []
    this.pacotes = []
  }

}