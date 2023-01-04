import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AdminEksambandhService } from 'src/app/services/admin-eksambandh.service';
import { NotificationService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  contactus: any;
  constructor(
    private adminApi: AdminEksambandhService,
    private notificationservice: NotificationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getContacts()
  }

  async getContacts() {
    this.notificationservice.showLoader();
    try {
      let response = await firstValueFrom(this.adminApi.getContacts());
      this.notificationservice.hideLoader();
      this.contactus = response.contacts;
    } catch (error: any) {
      this.notificationservice.hideLoader()
    }

  }

}
