import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ProductoUsuarioPage } from './producto-usuario.page';

describe('ProductoUsuarioPage', () => {
  let component: ProductoUsuarioPage;
  let fixture: ComponentFixture<ProductoUsuarioPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProductoUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
