import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaNovedadesComponent } from './lista-novedades.component';

describe('ListaNovedadesComponent', () => {
  let component: ListaNovedadesComponent;
  let fixture: ComponentFixture<ListaNovedadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaNovedadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaNovedadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
