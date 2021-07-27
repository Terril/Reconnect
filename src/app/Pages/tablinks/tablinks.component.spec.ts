import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablinksComponent } from './tablinks.component';

describe('TablinksComponent', () => {
  let component: TablinksComponent;
  let fixture: ComponentFixture<TablinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
