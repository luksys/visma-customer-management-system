import { Component, OnInit } from '@angular/core';
import {CustomerService} from "../../services/customer/customer.service";
import {PATH_REGISTER_CUSTOMER} from "../../constants";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  public customers;

  constructor(
    private customersService: CustomerService
  ) { }

  ngOnInit(): void {
    this.customers = this.customersService.getAll();
  }

  get pathRegisterCustomerConstant() {return PATH_REGISTER_CUSTOMER;}

  deleteCustomer(id: number) {
    this.customersService.delete(id);
    this.customers = this.customersService.getAll();
  }
}
