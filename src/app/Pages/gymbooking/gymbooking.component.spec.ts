import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymbookingComponent } from './gymbooking.component';

describe('GymbookingComponent', () => {
  let component: GymbookingComponent;
  let fixture: ComponentFixture<GymbookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GymbookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GymbookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
