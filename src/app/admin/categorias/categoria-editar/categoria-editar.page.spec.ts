import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriaEditarPage } from './categoria-editar.page';

describe('CategoriaEditarPage', () => {
  let component: CategoriaEditarPage;
  let fixture: ComponentFixture<CategoriaEditarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CategoriaEditarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
