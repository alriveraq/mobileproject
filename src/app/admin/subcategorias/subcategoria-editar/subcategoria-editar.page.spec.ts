import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubcategoriaEditarPage } from './subcategoria-editar.page';

describe('SubcategoriaEditarPage', () => {
  let component: SubcategoriaEditarPage;
  let fixture: ComponentFixture<SubcategoriaEditarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SubcategoriaEditarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
