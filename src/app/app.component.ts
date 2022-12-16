import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { IDisposable, IToast, ToastType } from './models/notification-model';
import { NotificationService } from './services/notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showLoader: boolean = false;
  private loaderRegistration: IDisposable;
  private toastRegistration: IDisposable;
  constructor(
    private readonly notificationService: NotificationService,
    private router: Router,
    private messageService: MessageService,
  ) {
    this.loaderRegistration = this.notificationService.registerLoaderTrigger(
      this.handleLoader.bind(this)
    );

    this.toastRegistration = this.notificationService.registerToastTrigger(
      this.handleToast.bind(this)
    );
  }

  private handleLoader(show: boolean) {
    this.showLoader = show;
  }

  private handleToast(toast: IToast) {
    this.messageService.add({ severity: toast.type, detail: toast.message });
  }
}
