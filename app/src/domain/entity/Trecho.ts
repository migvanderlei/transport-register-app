import Endereco from "./Endereco";
import Pacote from "./Pacote";

export default class Trecho {
  origem: Endereco;
  destino: Endereco;
  destinoFinal: Endereco;
  observacoes?: string;

  constructor(
    origem: Endereco,
    destino: Endereco,
    destinoFinal: Endereco,
    observacoes?: string
  ) {
    this.origem = origem;
    this.destino = destino;
    this.destinoFinal = destinoFinal;
    this.observacoes = observacoes;
  }
}
