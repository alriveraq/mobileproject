import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubcategoriaAgregarPage } from './subcategoria-agregar.page';

describe('SubcategoriaAgregarPage', () => {
  let component: SubcategoriaAgregarPage;
  let fixture: ComponentFixture<SubcategoriaAgregarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SubcategoriaAgregarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
