import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {NotificationBarModel} from "../../models/NotificationBar.model";

@Injectable({
  providedIn: 'root'
})
export class NotificationBarService {

  public message: Subject<NotificationBarModel> = new Subject();

  constructor() {}

  public addError(message: string){
    this.message.next({message: message, type: 'error'});
  }

  public addSuccess(message: string){
    this.message.next({message: message, type: 'success'});
  }
}
