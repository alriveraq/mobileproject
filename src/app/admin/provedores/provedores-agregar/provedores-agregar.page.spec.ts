import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProvedoresAgregarPage } from './provedores-agregar.page';

describe('ProvedoresAgregarPage', () => {
  let component: ProvedoresAgregarPage;
  let fixture: ComponentFixture<ProvedoresAgregarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProvedoresAgregarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
