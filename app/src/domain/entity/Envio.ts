import Destinatario from "./Destinatario";
import Pacote from "./Pacote";
import Remetente from "./Remetente";
import Trecho from "./Trecho";

export default class Envio {
  id: string;
  pacote: Pacote;
  dataDeCriacao: Date;
  previsaoDeEntrega: Date;
  remetente: Remetente;
  destinatario: Destinatario;
  trechos: Trecho[];
  finalizado?: boolean;
  entregue?: boolean;

  constructor(
    id: string,
    pacote: Pacote,
    dataDeCriacao: Date,
    previsaoDeEntrega: Date,
    remetente: Remetente,
    destinatario: Destinatario,
    trechos: Trecho[],
    finalizado?: boolean,
    entregue?: boolean
  ) {
    this.id = id;
    this.pacote = pacote;
    this.dataDeCriacao = dataDeCriacao;
    this.previsaoDeEntrega = previsaoDeEntrega;
    this.remetente = remetente;
    this.destinatario = destinatario;
    this.trechos = trechos;
    this.finalizado = finalizado;
    this.entregue = entregue;
  }
}
