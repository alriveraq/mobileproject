import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductoEditarPage } from './producto-editar.page';

describe('ProductoEditarPage', () => {
  let component: ProductoEditarPage;
  let fixture: ComponentFixture<ProductoEditarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProductoEditarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
