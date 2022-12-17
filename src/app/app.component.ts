import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { IDisposable, IToast, ToastType } from './models/notification-model';
import { NotificationService } from './services/notifications.service';
import { DataStorageService } from './services/data-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showLoader: boolean = false;
  private loaderRegistration: IDisposable;
  private toastRegistration: IDisposable;
  userData: any;
  constructor(
    private readonly notificationService: NotificationService,
    private router: Router,
    private messageService: MessageService,
    private datastorage: DataStorageService
  ) {
    this.loaderRegistration = this.notificationService.registerLoaderTrigger(
      this.handleLoader.bind(this)
    );

    this.toastRegistration = this.notificationService.registerToastTrigger(
      this.handleToast.bind(this)
    );

    this.datastorage.userData.subscribe(data => {
      this.userData = data;
    });

    if (!this.userData?._id) {
      this.datastorage.setUser(JSON.parse(sessionStorage?.getItem('userData') || '{}'))
    }

    console.log(this.userData)
  }

  private handleLoader(show: boolean) {
    this.showLoader = show;
  }

  private handleToast(toast: IToast) {
    this.messageService.add({ severity: toast.type, detail: toast.message });
  }
}
