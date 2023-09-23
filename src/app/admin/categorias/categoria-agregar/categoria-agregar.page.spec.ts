import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriaAgregarPage } from './categoria-agregar.page';

describe('CategoriaAgregarPage', () => {
  let component: CategoriaAgregarPage;
  let fixture: ComponentFixture<CategoriaAgregarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CategoriaAgregarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
