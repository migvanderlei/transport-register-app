import Endereco from "../interface/Endereco";
import Pacote from "./Pacote";

export default class Trecho {
  hash: string
  pacote: Pacote
  origem: Endereco
  destino: Endereco
  destinoFinal: Endereco
  observacoesNaChegada?: string


  constructor(
    hash: string,
    pacote: Pacote, 
    origem: Endereco, 
    destino: Endereco, 
    destinoFinal: Endereco, 
    observacoesNaChegada?: string
) {
    this.hash = hash
    this.pacote = pacote
    this.origem = origem
    this.destino = destino
    this.destinoFinal = destinoFinal
    this.observacoesNaChegada = observacoesNaChegada
  }

}
