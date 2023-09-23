import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarritoProductosPage } from './carrito-productos.page';

describe('CarritoProductosPage', () => {
  let component: CarritoProductosPage;
  let fixture: ComponentFixture<CarritoProductosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CarritoProductosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
