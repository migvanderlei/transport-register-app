export default class Pacote {
  peso: number;
  altura: number;
  largura: number;
  profundidade: number;

  constructor(
    peso: number,
    altura: number,
    largura: number,
    profundidade: number
  ) {
    this.peso = peso;
    this.altura = altura;
    this.largura = largura;
    this.profundidade = profundidade;
  }
}
