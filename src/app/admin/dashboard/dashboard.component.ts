import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ToastType } from 'src/app/models/notification-model';
import { UrlCollection } from 'src/app/models/urlcollection';
import { AdminEksambandhService } from 'src/app/services/admin-eksambandh.service';
import { NotificationService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dashoardDataArray: any[];
  constructor(
    private adminApi: AdminEksambandhService,
    private notificationservice: NotificationService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getDashboard()
  }

  async getDashboard() {
    this.notificationservice.showLoader();
    try {
      let res = await firstValueFrom(this.adminApi.getDashboardData());
      this.notificationservice.hideLoader();
      this.dashoardDataArray = [
        { "title": "Total Users", "number": res.dashboard.user, "route": "users", "button": "Users" },
        { "title": "Total Relationships", "number": res.dashboard.relationship, "route": "relationships", "button": "Relationships" },
        { "title": "Total Payments", "number": res.dashboard.payment, "route": "payments", "button": "Payments" },
        { "title": "Help & Support", "number": res.dashboard.contact, "route": "contact", "button": "Help & Support" }
      ]

    } catch (error: any) {
      this.notificationservice.hideLoader();
      this.notificationservice.showToast({ type: ToastType.Error, message: error.error.error });
    }
  }

  routeToPage(data: any) {
    if (data === "users") {
      this.router.navigate([UrlCollection.adminusers])
    } else if (data === "relationships") {
      this.router.navigate([UrlCollection.adminrelationship])
    } else if (data === "payments") {
      this.router.navigate([UrlCollection.adminpayments])
    } else if (data === "contact") {
      this.router.navigate([UrlCollection.admincontactus])
    }
  }



}
