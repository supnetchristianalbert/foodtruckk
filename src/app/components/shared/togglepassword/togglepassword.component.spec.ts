import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TogglepasswordComponent } from './togglepassword.component';

describe('TogglepasswordComponent', () => {
  let component: TogglepasswordComponent;
  let fixture: ComponentFixture<TogglepasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TogglepasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TogglepasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
