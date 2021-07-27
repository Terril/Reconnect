import { ClassListingComponent } from './classlisting.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';



describe('ClassListingComponent', () => {
  let component: ClassListingComponent;
  let fixture: ComponentFixture<ClassListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
