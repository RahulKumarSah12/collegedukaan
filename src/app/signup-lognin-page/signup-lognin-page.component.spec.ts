import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupLogninPageComponent } from './signup-lognin-page.component';

describe('SignupLogninPageComponent', () => {
  let component: SignupLogninPageComponent;
  let fixture: ComponentFixture<SignupLogninPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupLogninPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupLogninPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
