import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {debounceTime} from "rxjs/operators";
import {NotificationBarModel} from "../../models/NotificationBar.model";
import {Subscription} from "rxjs";
import {NotificationBarService} from "../../services/notification-bar/notification-bar.service";

@Component({
  selector: 'app-notification-bar',
  templateUrl: './notification-bar.component.html',
  styleUrls: ['./notification-bar.component.scss']
})
export class NotificationBarComponent implements OnInit {

  private subscription:Subscription = new Subscription();
  isClosed = true;
  notification: NotificationBarModel = {message: '', type: ''};

  constructor(
    private _globalNotificationService: NotificationBarService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.subscription = this._globalNotificationService.message.subscribe(
      notification => {
        this.notification = notification;
        this.isClosed = false;
        this.ref.detectChanges();
      }
    );

    this._globalNotificationService.message.pipe(
      debounceTime(3000)
    ).subscribe(() => {
      this.notification = {message: '', type: ''};
      this.isClosed = true;
      this.ref.detectChanges();
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
