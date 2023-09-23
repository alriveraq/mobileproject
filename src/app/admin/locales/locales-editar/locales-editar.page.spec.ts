import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocalesEditarPage } from './locales-editar.page';

describe('LocalesEditarPage', () => {
  let component: LocalesEditarPage;
  let fixture: ComponentFixture<LocalesEditarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LocalesEditarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
