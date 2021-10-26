import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTenantComponent } from './home-tenant.component';

describe('HomeTenantComponent', () => {
  let component: HomeTenantComponent;
  let fixture: ComponentFixture<HomeTenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeTenantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
