import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRegisterEditFormComponent } from './customer-register-edit-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {GeocodingService} from "../../services/geocoding/geocoding.service";
import {RouterModule} from "@angular/router";

let GeocodeServiceMock;

describe('CustomerRegisterEditFormComponent', () => {
  let component: CustomerRegisterEditFormComponent;
  let fixture: ComponentFixture<CustomerRegisterEditFormComponent>;

  beforeEach(async () => {
    GeocodeServiceMock = {};

    await TestBed.configureTestingModule({
      declarations: [ CustomerRegisterEditFormComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([])
      ],
      providers: [ { provide: GeocodingService, useValue: GeocodeServiceMock } ],
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
