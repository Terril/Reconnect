import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalwalletComponent } from './digitalwallet.component';

describe('DigitalwalletComponent', () => {
  let component: DigitalwalletComponent;
  let fixture: ComponentFixture<DigitalwalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DigitalwalletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalwalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
