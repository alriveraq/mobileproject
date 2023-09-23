import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductoAgregarPage } from './producto-agregar.page';

describe('ProductoAgregarPage', () => {
  let component: ProductoAgregarPage;
  let fixture: ComponentFixture<ProductoAgregarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProductoAgregarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
