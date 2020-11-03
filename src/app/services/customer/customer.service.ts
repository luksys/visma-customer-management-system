import { Injectable } from '@angular/core';
import {CustomerModel} from "../../models/Customer.model";
import {CUSTOMER_LOCAL_STORAGE_KEY} from "../../constants";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  public customers;
  public lastCustomerIdTracker = -1;

  constructor() {
    this.getAll();

    if (this.customers.length) {
      const customerIds: Array<number> = this.customers.map((customer) => customer.id);
      this.lastCustomerIdTracker = Math.max(...customerIds);
    }
  }

  get(id: number) {
    return this.customers.find((customer) => customer.id === id);
  }

  getAll() {
    if (!this.customers) {
      this.customers = localStorage.getItem(CUSTOMER_LOCAL_STORAGE_KEY)
        ? JSON.parse(localStorage.getItem(CUSTOMER_LOCAL_STORAGE_KEY))
        : [];
    }

    return this.customers;
  }

  add(customer: CustomerModel) {
   this.lastCustomerIdTracker++;
   customer.id = this.lastCustomerIdTracker;
   this.customers.push(customer);
   this.updateDataStorage();
  }

  update(customer) {
    this.customers = this.customers.map((customerFromArr) => customerFromArr.id === customer.id ? customer : customerFromArr);
    this.updateDataStorage();
  }

  updateDataStorage() {
    localStorage.setItem(CUSTOMER_LOCAL_STORAGE_KEY, JSON.stringify(this.customers));
  }

  delete(id: number) {
    this.customers = this.customers.filter((customer) => customer.id !== id);
    this.updateDataStorage();
  }
}
