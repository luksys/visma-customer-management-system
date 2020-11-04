import { Component } from '@angular/core';
import {PATH_BASE, PATH_REGISTER_CUSTOMER} from './constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  get pathRegisterCustomerConstant() {return PATH_REGISTER_CUSTOMER;}
  get pathBase() {return PATH_BASE;}
}
