import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomepopupComponent } from './welcomepopup.component';

describe('WelcomepopupComponent', () => {
  let component: WelcomepopupComponent;
  let fixture: ComponentFixture<WelcomepopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomepopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomepopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
