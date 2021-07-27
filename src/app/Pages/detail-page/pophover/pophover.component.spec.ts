import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PophoverComponent } from './pophover.component';

describe('PophoverComponent', () => {
  let component: PophoverComponent;
  let fixture: ComponentFixture<PophoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PophoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PophoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
