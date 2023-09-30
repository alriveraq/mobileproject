import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProvedoresEditarPage } from './provedores-editar.page';

describe('ProvedoresEditarPage', () => {
  let component: ProvedoresEditarPage;
  let fixture: ComponentFixture<ProvedoresEditarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProvedoresEditarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
