import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CustomerService} from "../../services/customer/customer.service";

@Component({
  selector: 'app-update',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {
  public customer;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    const customerId = +this.route.snapshot.paramMap.get('id');
    this.customer = this.customerService.get(customerId);
  }
}
