import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  SimpleChanges
} from '@angular/core';
import {Regra} from '../../core/classes/Regra';
import {Rede} from '../../core/classes/Rede';

import * as html2pdf from "html2pdf.js";
import * as canvasToImage from "canvas-to-image";
@Component({
  selector: 'app-cartao-experimento',
  templateUrl: './cartao-experimento.component.html',
  styleUrls: ['./cartao-experimento.component.scss']
})
export class CartaoExperimentoComponent implements OnInit {
  tamanho: any = new Array(400)
  tamanho2: any = new Array(40)
  @ViewChild('canvasDiv') canvasDiv:ElementRef;


  @Input('identificador')
  identificador: any;
  @Input('tamanhoReticulado')
  tamanhoReticulado: any;
  @Input('espacosDeTempo')
  espacosDeTempo: any;
  @Input('mode')
  mode: any;
  @Input('isRede')
  rede?: boolean;
  @Input('redeEnvolvida')
  redeEnvolvida?: any;

  @Input('salvar')
  salvar?: boolean;
  
  @Input('configuracaoReticulado')
  configuracaoReticulado?: any;
  @ViewChild('myCanvas', {
    static: false
  })
  myCanvas: ElementRef < HTMLCanvasElement > ;
  regra: Regra;
  @Input()
  numeroRegra: number;
  @Input()
  corEnvolvida: string;
  @Output() clicadoCanvas = new EventEmitter < string > ();
  tamanhoCelula = 3;
  public context: CanvasRenderingContext2D;

  constructor() {

  }
  arrastado(e){

    console.log(e)
  }

  despacharCliqueCanvas() {

    this.clicadoCanvas.emit(JSON.stringify({numeroRegra:this.numeroRegra, id:this.identificador}));

  }
  ngOnInit() {}
  ngAfterViewInit(): void {
    this.pintar()
  }

  pintar(){





    if(this.configuracaoReticulado == undefined){
      this.configuracaoReticulado = new Array(100)
      let arrayInicial = this.configuracaoReticulado;
      for (let i = 0; i < arrayInicial.length; i++)
      arrayInicial[i]=0
      arrayInicial[Math.floor(arrayInicial.length/2)] = 1
      // console.log(arrayInicial)
    }

    if(!this.rede)
    this.regra = new Regra(this.tamanhoReticulado, +this.numeroRegra, this.espacosDeTempo,
      this.configuracaoReticulado
      );
      else {
        this.regra = new Rede(this.tamanhoReticulado, +this.numeroRegra, this.espacosDeTempo,
        0.1,this.configuracaoReticulado,true,+this.redeEnvolvida
        );

      }
      // this.regra.exibir()

    let ctx = this.myCanvas.nativeElement.getContext('2d');
    ctx.clearRect(0, 0, this.myCanvas.nativeElement.width, this.myCanvas.nativeElement.height);

    for (let i = 0; i < this.regra.vetoresDiagrama.length; i += 1) {
      for (let j = 0; j < this.regra.vetoresDiagrama[i].length; j++) {
        ctx.fillStyle = this.regra.vetoresDiagrama[i][j] == 0 ? '#FFFFFF' : "black";
        ctx.fillRect(j * this.tamanhoCelula, i * this.tamanhoCelula, this.tamanhoCelula, this.tamanhoCelula);

      }
    }
    if(this.salvar){
      // let sulfixo = this.rede?("rede"+this.redeEnvolvida):"elementar"
      // let nome_arquivo = sulfixo+"_regra_"+this.numeroRegra
      // // var worker = html2pdf().from(document.getElementsByTagName("canvas")[3]).save();
      // canvasToImage(document.getElementsByTagName("canvas")[this.rede?9:3], {
      //     name: nome_arquivo,
      //     type: 'jpg',
      //     quality: 1
      //   });

      // console.log(this.canvasDiv.nativeElement)
      }

  }

  getv() {
    return Math.random() > 0.5

  }

  ngOnChanges(changes: SimpleChanges) {

    if(changes.redeEnvolvida!=undefined){
      if(changes.redeEnvolvida.firstChange==false){
        if(changes.redeEnvolvida.currentValue!=undefined)
        this.pintar()
      }

    }
    // console.log(changes.redeEnvolvida)
  }

}
