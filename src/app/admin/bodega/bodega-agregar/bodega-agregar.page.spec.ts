import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BodegaAgregarPage } from './bodega-agregar.page';

describe('BodegaAgregarPage', () => {
  let component: BodegaAgregarPage;
  let fixture: ComponentFixture<BodegaAgregarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BodegaAgregarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
