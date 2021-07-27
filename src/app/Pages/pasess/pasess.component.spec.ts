import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasessComponent } from './pasess.component';

describe('PasessComponent', () => {
  let component: PasessComponent;
  let fixture: ComponentFixture<PasessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
