import {
  Component,
  OnInit,
  ViewChildren,
  QueryList
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  CartaoExperimentoComponent
} from './cartao-experimento/cartao-experimento.component';
import {
  ViewChild
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  Rede
} from '../core/classes/Rede';


import * as configuracoesReticulados from "./../core/classes/configuracoesReticulado";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  redeSmallWorld = "2";
  modo = 1;
  numerosDeRegra = [];
  configuracoesReticulado =configuracoesReticulados.default;
  inputTamanhoReticulado = 100;
  inputEspacosDeTempo = 50;
  clicadoIdCanvas = undefined;
  checkboxReticulado = [];
  aptoEditar = false;
  activeTab = "Comparação";
  regraFixa = 193;

  tabs = [{
      nome: "Relatórios",
      label: {
        width: "30px",
        left: "163px"
      },
      active: false
    },
    {
      nome: "Comparação",
      label: {
        width: "75px",
        left: "7px"
      },
      active: true
    },
    {
      nome: "Inspeção",
      label: {
        width: "55px",
        left: "95px"
      },
      active: false
    },

  ]

  mudarAba(item) {
    let {
      nome
    } = item;
    this.activeTab = nome;
    this.tabs.forEach(tab => {
      tab.active = tab.nome == nome

    })

    this.configurarAba(nome);



  }


  configurarAba(aba) {
    switch (aba) {
      case "Comparação":
        this.aptoEditar = false;
        this.numerosDeRegra = [this.regraFixa, this.regraFixa, this.regraFixa, this.regraFixa, this.regraFixa, this.regraFixa, this.regraFixa, this.regraFixa, this.regraFixa, this.regraFixa, this.regraFixa, this.regraFixa]
        this.modo = 1;

        break;
      case "Inspeção":
        this.numerosDeRegra = [this.getRegraAleatoria(), this.getRegraAleatoria(), this.getRegraAleatoria(), this.getRegraAleatoria(), this.getRegraAleatoria(), this.getRegraAleatoria(), this.getRegraAleatoria(), this.getRegraAleatoria(), this.getRegraAleatoria(), this.getRegraAleatoria(), this.getRegraAleatoria(), this.getRegraAleatoria()]

        break;
      case "Teste":
        break;


    }


  }


  fixarUmaUnicaRegra(elemento) {
    this.experimentos.forEach(experimento => {

      this.numerosDeRegra[this.clicadoIdCanvas - 1] = +elemento
      experimento.numeroRegra = +elemento

      experimento.pintar()
    });


  }

  getRegraAleatoria() {

    return Math.round(Math.random() * 255)

  }

  @ViewChildren(CartaoExperimentoComponent) experimentos: QueryList < CartaoExperimentoComponent >
    formRegraFixa = new FormGroup({}) // Instantiating our form

  constructor(private router: Router, private fb: FormBuilder) {



    for (let i = 0; i < 6; i++) {
      this.checkboxReticulado.push(configuracoesReticulados.default[i]);
    }
    console.log(this.checkboxReticulado)

    this.formRegraFixa = fb.group({
      // Adding the "myNum" input to our FormGroup along with its min-max Validators.
      'regraFixa': ['', [Validators.min(0), Validators.max(255)]]
    })
    this.numerosDeRegra.push(
      this.regraFixa,
      this.regraFixa,
      this.regraFixa,
      this.regraFixa,
      this.regraFixa,
      this.regraFixa,
      this.regraFixa,
      this.regraFixa,
      this.regraFixa,
      this.regraFixa,
      this.regraFixa,
      this.regraFixa,
      this.regraFixa


    )
  }



  public realValue: number;
  public min: number = 0;
  public max: number = 255;

  get inputRegra(): number {
    return this.realValue;
  }

  set inputRegra(newValue: number) {
    this.realValue = newValue;
    if (this.realValue < this.min) {
      this.realValue = undefined;
      setTimeout(() => {
        this.realValue = this.min;
      });
    } else if (this.realValue > this.max) {
      this.realValue = undefined;
      setTimeout(() => {
        this.realValue = this.max;
      });
    }
  }
  mudarInputRegra(valorRecebido) {
    valorRecebido = JSON.parse(valorRecebido)
    // console.log(valorRecebido)
    this.inputRegra = +valorRecebido["numeroRegra"];
    this.clicadoIdCanvas = +valorRecebido["id"]
    this.aptoEditar = true;

  }

  repintarRegra(elemento) {

    switch (this.modo) {
      case 1:
        this.experimentos.forEach(experimento => {
          this.numerosDeRegra[this.clicadoIdCanvas - 1] = +elemento
          experimento.numeroRegra = +elemento
          experimento.pintar()

        });
        break;

      default:
        break;
    }




  }

  repintarTudo() {
    this.experimentos.forEach(experimento => {

      experimento.pintar()
    });



  }


  mudarRedeSmallWorld(novaRede){
    this.redeSmallWorld = novaRede
  }


  ngOnInit(): void {

  }
}
