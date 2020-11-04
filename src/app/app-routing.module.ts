import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CustomersComponent} from "./views/customers/customers.component";
import {CustomerEditComponent} from "./views/customer-edit/customer-edit.component";
import {CustomerRegisterComponent} from "./views/customer-register/customer-register.component";
import {Content404Component} from "./shared/content-404/content-404.component";

const routes: Routes = [
  {path: '', component: CustomersComponent},
  {path: 'customer/edit/:id', component: CustomerEditComponent},
  {path: 'customer/register', component: CustomerRegisterComponent},
  {path: '**', component: Content404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
