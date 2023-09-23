import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpleadosEditarPage } from './empleados-editar.page';

describe('EmpleadosEditarPage', () => {
  let component: EmpleadosEditarPage;
  let fixture: ComponentFixture<EmpleadosEditarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EmpleadosEditarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
