import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRegisterEditFormComponent } from './customer-register-edit-form.component';

describe('RegisterUpdateFormComponent', () => {
  let component: CustomerRegisterEditFormComponent;
  let fixture: ComponentFixture<CustomerRegisterEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerRegisterEditFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerRegisterEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
