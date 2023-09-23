import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocalesPage } from './locales.page';

describe('LocalesPage', () => {
  let component: LocalesPage;
  let fixture: ComponentFixture<LocalesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LocalesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
