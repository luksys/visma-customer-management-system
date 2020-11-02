import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerRegisterComponent } from './views/customer-register/customer-register.component';
import { CustomerEditComponent } from './views/customer-edit/customer-edit.component';
import { Page404Component } from './views/page-404/page-404.component';
import { CustomerRegisterEditFormComponent } from './shared/customer-register-edit-form/customer-register-edit-form.component';
import { CustomersComponent } from './views/customers/customers.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerRegisterComponent,
    CustomerEditComponent,
    Page404Component,
    CustomerRegisterEditFormComponent,
    CustomersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
