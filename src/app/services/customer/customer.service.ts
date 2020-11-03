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
   localStorage.setItem(CUSTOMER_LOCAL_STORAGE_KEY, this.customers);
  }

  update(customer) {
    this.customers.map((customerFromArr) => customerFromArr.id === customer.id ? customer : customerFromArr);
  }

  delete(id: number) {
    this.customers.filter((customer) => customer.id !== id);
  }
}
