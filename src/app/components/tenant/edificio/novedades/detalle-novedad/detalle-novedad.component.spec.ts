import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleNovedadComponent } from './detalle-novedad.component';

describe('DetalleNovedadComponent', () => {
  let component: DetalleNovedadComponent;
  let fixture: ComponentFixture<DetalleNovedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleNovedadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleNovedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
