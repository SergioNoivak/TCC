import { Component, OnInit } from '@angular/core';
import { Rede} from '../../core/classes/Rede';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.scss']
})
export class RelatoriosComponent implements OnInit {

  constructor() {

    let rede = new Rede(100,3,15,0.1,new Array(100))
    console.log(rede)
  }

  ngOnInit(): void {
  }

}
