import Endereco from "./Endereco";
import Pacote from "./Pacote";

export default class Trecho {
  hash: string;
  pacote: Pacote;
  origem: Endereco;
  destino: Endereco;
  destinoFinal: Endereco;
  observacoes?: string;

  constructor(
    hash: string,
    pacote: Pacote,
    origem: Endereco,
    destino: Endereco,
    destinoFinal: Endereco,
    observacoes?: string
  ) {
    this.hash = hash;
    this.pacote = pacote;
    this.origem = origem;
    this.destino = destino;
    this.destinoFinal = destinoFinal;
    this.observacoes = observacoes;
  }
}
