import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { CartaoExperimentoComponent } from './cartao-experimento/cartao-experimento.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RelatoriosComponent } from './relatorios/relatorios.component';

@NgModule({
  declarations: [HomeComponent, CartaoExperimentoComponent, RelatoriosComponent],
  imports: [CommonModule, SharedModule, HomeRoutingModule,FormsModule,ReactiveFormsModule]
})
export class HomeModule {}
