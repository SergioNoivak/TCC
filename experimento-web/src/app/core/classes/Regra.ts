

export class Regra{
  tamanhoReticulado:number;
  configuracaoInicial:Array<number>;
  tamanhoRegra:number;
  regra:any;
  tamanhoVizinhanca:number;
  estadoAtual:Array<number>;
  vetoresDiagrama:Array<any>;
  espacosDeTempo:number;

  constructor(tamanhoReticulado:number,tamanhoRegra:number,espacosDeTempo:number,configuracaoInicial?:Array<number>){
    this.espacosDeTempo = espacosDeTempo;
    this.tamanhoReticulado = tamanhoReticulado;
    this.configuracaoInicial = configuracaoInicial
    this.tamanhoRegra = tamanhoRegra;
    this.tamanhoVizinhanca = 3
    this.regra = this.dec2bin(this.tamanhoRegra,this.tamanhoVizinhanca)
    this.estadoAtual = this.configuracaoInicial;

    this.vetoresDiagrama = new Array(0)
    this.vetoresDiagrama.push(this.estadoAtual)

    for (let i = 0; i < this.espacosDeTempo; i++) {
      this.estadoAtual = this.evoluir(this.estadoAtual)
      this.vetoresDiagrama.push(this.estadoAtual)
    }


  }

  evoluir(estadoAtual){
    let n = estadoAtual.length;
    let proximoEstado = new Array(this.tamanhoReticulado)
    for (let i = 0; i < n; i++) {

      let esq = ((i-1) % n + n) % n
      let dir = ((i+1) % n + n) % n
      let pontoDeRegra =""+estadoAtual[esq]+""+estadoAtual[i]+""+estadoAtual[dir];
      let indice = this.bin2dec(pontoDeRegra);
      proximoEstado[i] = +this.regra[indice]
    }
    return proximoEstado;
  }


  exibir():void{
    console.log("Tamanho: "+this.tamanhoReticulado);
    console.log("Inicio: "+this.configuracaoInicial)



  }

 dec2bin(dec,tamanho){
    let regraEmBinario =  (dec >>> 0).toString(2);

    let regra = new Array(Math.pow(2,tamanho))

    let k = regraEmBinario.length-1;

    for (let i = regra.length-1; i >= 0; i--) {
      if(k>=0){
        regra[i] = regraEmBinario[k]
        k--;
      }
      else
        regra[i] = 0;
    }
    return regra;
}
 bin2dec(num) {
  let dec = 0;
  for (let i = 0; i < num.length; i++) {
      if (num[num.length - (i + 1)] === '1') {
          dec += 2 ** i;
      }
  }
  return dec;
}


}
