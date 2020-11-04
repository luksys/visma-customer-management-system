import {Component, Input, NgZone, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, NgForm, Validators} from "@angular/forms";
import {CustomerService} from "../../services/customer/customer.service";
import {GeocodingService} from "../../services/geocoding/geocoding.service";
import {CustomerModel} from "../../models/Customer.model";
import {NotificationBarService} from "../../services/notification-bar/notification-bar.service";
import {PATH_BASE} from "../../constants";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-update-form',
  templateUrl: './customer-register-edit-form.component.html',
  styleUrls: ['./customer-register-edit-form.component.scss']
})
export class CustomerRegisterEditFormComponent implements OnInit {
  @Input() customer: CustomerModel;
  public isCustomerEdited: boolean = false;
  public displayError: boolean = false;
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
    private notificationBarService: NotificationBarService,
    private router: Router,
    private zone: NgZone
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
    if (Object.keys(customer).length > 0) {
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
    } else {
      this.displayError = true;
    }
  }

  onSubmit() {
    if (this.customerForm.invalid) return;

    const address = `${this.city.value}, ${this.street.value} ${this.houseNumber.value}, ${this.zip.value}`;
    this.geocodeService.geocode(address).subscribe((result) => {
      const addressComponents = result[0].address_components;

      const city = this.getAddressInfo('locality', addressComponents);
      const zip = this.getAddressInfo('postal_code', addressComponents);
      const street = this.getAddressInfo('route', addressComponents);
      const houseNumber = this.getAddressInfo('street_number', addressComponents);

      if (city && zip && street && houseNumber) {
        const customer: CustomerModel = {
          fullName: this.fullName.value,
          email: this.email.value,
          city: city,
          street: street,
          houseNumber: houseNumber,
          zip: zip,
        }

        if (this.isCustomerEdited) {
          customer.id = this.customer.id;
          this.customerService.update(customer);
          this.notificationBarService.addSuccess('Customer has been updated successfully.');
        } else {
          this.customerService.add(customer);
          this.notificationBarService.addSuccess('Customer has been added successfully.');
        }

        this.zone.run(() => this.router.navigate([PATH_BASE])).then();
      }
    },
    (error) => {
      this.notificationBarService.addSuccess('Please enter correct address or contact website administrator.');
    });
  }

  getAddressInfo(key: 'locality' | 'postal_code' | 'route' | 'street_number', addressComponents) {
    if (!addressComponents) return null;

    const data = addressComponents.find(component => component.types[0] === key);

    if (data) return data.long_name;
    return null;
  }
}
