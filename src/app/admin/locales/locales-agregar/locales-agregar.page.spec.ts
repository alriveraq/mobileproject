import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocalesAgregarPage } from './locales-agregar.page';

describe('LocalesAgregarPage', () => {
  let component: LocalesAgregarPage;
  let fixture: ComponentFixture<LocalesAgregarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LocalesAgregarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
