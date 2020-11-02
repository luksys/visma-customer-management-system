import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
declare const google: any

@Component({
  selector: 'app-register-update-form',
  templateUrl: './customer-register-edit-form.component.html',
  styleUrls: ['./customer-register-edit-form.component.scss']
})
export class CustomerRegisterEditFormComponent implements OnInit {
  customerForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    address: this.fb.group({
      city: ['', Validators.required],
      street: ['', Validators.required],
      houseNumber: [null, Validators.required],
      zip: ['', Validators.required]
    })
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
  }

  get fullName() { return this.customerForm.get('fullName'); }
  get email() { return this.customerForm.get('email'); }
  get city() { return this.customerForm.get('address.city'); }
  get street() { return this.customerForm.get('address.street'); }
  get houseNumber() { return this.customerForm.get('address.houseNumber'); }
  get zip() { return this.customerForm.get('address.zip'); }

  onSubmit() {
    if (this.customerForm.invalid) return;

    const address = `${this.city.value}, ${this.street.value} ${this.houseNumber.value}, ${this.zip.value}`;
    this.geocodeAddress(address);
  }

  geocodeAddress(address) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === "OK") {

      } else {

      }
    });
  }
}
