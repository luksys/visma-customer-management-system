import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {CustomerService} from "../../services/customer/customer.service";
import {GeocodingService} from "../../services/geocoding/geocoding.service";
import {CustomerModel} from "../../models/Customer.model";
import {NotificationBarService} from "../../services/notification-bar/notification-bar.service";

@Component({
  selector: 'app-register-update-form',
  templateUrl: './customer-register-edit-form.component.html',
  styleUrls: ['./customer-register-edit-form.component.scss']
})
export class CustomerRegisterEditFormComponent implements OnInit {
  @Input() customer: CustomerModel;
  public isCustomerEdited: boolean = false;
  public customerForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    address: this.fb.group({
      city: ['', Validators.required],
      street: ['', Validators.required],
      houseNumber: [null, Validators.required],
      zip: ['', Validators.required]
    })
  });

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private geocodeService: GeocodingService,
    private notificationBarService: NotificationBarService
  ) {}

  ngOnInit(): void {
    this.setCustomerDetails(this.customer);
  }

  get fullName() { return this.customerForm.get('fullName'); }
  get email() { return this.customerForm.get('email'); }
  get city() { return this.customerForm.get('address.city'); }
  get street() { return this.customerForm.get('address.street'); }
  get houseNumber() { return this.customerForm.get('address.houseNumber'); }
  get zip() { return this.customerForm.get('address.zip'); }

  setCustomerDetails(customer) {
    if (!customer) return;

    this.isCustomerEdited = true;
    this.customerForm.setValue({
      fullName: customer.fullName,
      email: customer.email,
      address: {
        city: customer.city,
        street: customer.street,
        houseNumber: customer.houseNumber,
        zip: customer.zip
      }
    })
  }

  onSubmit() {
    if (this.customerForm.invalid) return;

    const address = `${this.city.value}, ${this.street.value} ${this.houseNumber.value}, ${this.zip.value}`;
    this.geocodeService.geocode(address).subscribe((result) => {
      const customer: CustomerModel = {
        fullName: this.fullName.value,
        email: this.email.value,
        city: this.city.value,
        street: this.street.value,
        houseNumber: this.houseNumber.value,
        zip: this.zip.value,
      }

      if (this.isCustomerEdited) {
        customer.id = this.customer.id;
        this.customerService.update(customer);
        this.notificationBarService.addSuccess('Customer has been updated successfully.');
      } else {
        this.customerService.add(customer);
        this.notificationBarService.addSuccess('Customer has been added successfully.');
        this.customerForm.reset();
      }
    },
    (error) => {
      console.log({error})
    });
  }
}
