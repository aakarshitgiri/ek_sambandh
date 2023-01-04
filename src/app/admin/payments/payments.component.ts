import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ToastType } from 'src/app/models/notification-model';
import { AdminEksambandhService } from 'src/app/services/admin-eksambandh.service';
import { NotificationService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  payment: any;
  constructor(
    private adminApi: AdminEksambandhService,
    private notificationservice: NotificationService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getPayments();
  }

  async getPayments() {
    this.notificationservice.showLoader();
    try {
      let response = await firstValueFrom(this.adminApi.getPayments());
      this.payment = response.payments
      this.notificationservice.hideLoader();
    } catch (error: any) {
      this.notificationservice.hideLoader();
      this.notificationservice.showToast({ type: ToastType.Error, message: error.error.error });
    }
  }

}
