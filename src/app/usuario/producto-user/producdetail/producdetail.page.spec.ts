import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProducdetailPage } from './producdetail.page';

describe('ProducdetailPage', () => {
  let component: ProducdetailPage;
  let fixture: ComponentFixture<ProducdetailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProducdetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
