import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BodegaEditarPage } from './bodega-editar.page';

describe('BodegaEditarPage', () => {
  let component: BodegaEditarPage;
  let fixture: ComponentFixture<BodegaEditarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BodegaEditarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
