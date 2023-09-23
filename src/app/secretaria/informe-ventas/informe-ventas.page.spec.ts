import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InformeVentasPage } from './informe-ventas.page';

describe('InformeVentasPage', () => {
  let component: InformeVentasPage;
  let fixture: ComponentFixture<InformeVentasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InformeVentasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
