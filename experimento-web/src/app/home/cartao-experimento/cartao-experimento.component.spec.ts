import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaoExperimentoComponent } from './cartao-experimento.component';

describe('CartaoExperimentoComponent', () => {
  let component: CartaoExperimentoComponent;
  let fixture: ComponentFixture<CartaoExperimentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartaoExperimentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartaoExperimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
