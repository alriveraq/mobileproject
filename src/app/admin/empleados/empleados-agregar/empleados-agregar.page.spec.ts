import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpleadosAgregarPage } from './empleados-agregar.page';

describe('EmpleadosAgregarPage', () => {
  let component: EmpleadosAgregarPage;
  let fixture: ComponentFixture<EmpleadosAgregarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EmpleadosAgregarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
