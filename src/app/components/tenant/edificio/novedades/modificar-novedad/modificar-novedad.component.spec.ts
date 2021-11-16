import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarNovedadComponent } from './modificar-novedad.component';

describe('ModificarNovedadComponent', () => {
  let component: ModificarNovedadComponent;
  let fixture: ComponentFixture<ModificarNovedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarNovedadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarNovedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
