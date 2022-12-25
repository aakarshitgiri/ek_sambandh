import { Component, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { IDisposable, IToast, ToastType } from './models/notification-model';
import { NotificationService } from './services/notifications.service';
import { DataStorageService } from './services/data-storage.service';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { UrlCollection } from './models/urlcollection';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnChanges {
  showLoader: boolean = false;
  private loaderRegistration: IDisposable;
  private toastRegistration: IDisposable;
  userData: any;

  timedOut = false;
  lastPing?: Date;


  constructor(
    private readonly notificationService: NotificationService,
    private router: Router,
    private messageService: MessageService,
    private datastorage: DataStorageService,
    private idle: Idle,
    private keepalive: Keepalive,
    private notificationservice: NotificationService,
  ) {
    this.loaderRegistration = this.notificationService.registerLoaderTrigger(
      this.handleLoader.bind(this)
    );

    this.toastRegistration = this.notificationService.registerToastTrigger(
      this.handleToast.bind(this)
    );

    this.datastorage.currentUser.subscribe(data => {
      this.userData = data;

      if (data?._id) {
        idle.watch()
        this.timedOut = false;
      } else {
        idle.stop();
      }
    });

    if (!this.userData?._id) {
      this.datastorage.setUser(JSON.parse(sessionStorage?.getItem('userData') || '{}'))
    }

    idle.setIdle(600);
    idle.setTimeout(10);
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);


    idle.onIdleEnd.subscribe(() => {
      this.reset();
    });

    idle.onTimeout.subscribe(() => {
      this.timedOut = true;
      this.notificationservice.showToast({ type: ToastType.Error, message: 'Your session has been expired' });
      this.datastorage.clear();
      this.datastorage.setUser({})
      this.router.navigate([UrlCollection.Home]);
    });

    idle.onIdleStart.subscribe(() => {
    });

    idle.onTimeoutWarning.subscribe((countdown) => {
      //   let idleState = 'You will time out in ' + countdown + ' seconds!'
    });

    keepalive.interval(15);

    keepalive.onPing.subscribe(() => this.lastPing = new Date());

  }

  ngOnChanges() {

  }

  reset() {
    this.idle.watch();
    this.timedOut = false;
  }


  private handleLoader(show: boolean) {
    this.showLoader = show;
  }

  private handleToast(toast: IToast) {
    this.messageService.add({ severity: toast.type, detail: toast.message });
  }
}
