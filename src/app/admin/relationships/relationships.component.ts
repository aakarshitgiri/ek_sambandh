import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ToastType } from 'src/app/models/notification-model';
import { UrlCollection } from 'src/app/models/urlcollection';
import { AdminEksambandhService } from 'src/app/services/admin-eksambandh.service';
import { NotificationService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-relationships',
  templateUrl: './relationships.component.html',
  styleUrls: ['./relationships.component.scss']
})
export class RelationshipsComponent implements OnInit {
  relationships: any;
  displayBasic: boolean = false;
  relationshipsid: string;
  user: string;
  constructor(
    private router: Router,
    private adminApi: AdminEksambandhService,
    private notificationservice: NotificationService,
    private activateRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    let id = this.activateRouter.snapshot.queryParams['id'];
    let name = this.activateRouter.snapshot.queryParams['name'];
    if (id) {
      this.user = name;
      this.getUserRelationship(id);
    } else {
      this.getRelationship();
    }

  }

  viewResults(data: any) {
    this.router.navigate([UrlCollection.Result], { queryParams: { id: data._id, user: data?.requestingPartnerId?.fullname, partner: data?.requestedPartnerId?.fullname, view: 'admin' } });
  }

  async deleteRelationship() {
    this.notificationservice.showLoader();
    try {
      this.displayBasic = false;
      let res = await firstValueFrom(this.adminApi.deleteRelationship(this.relationshipsid));

      this.notificationservice.hideLoader();
      this.getRelationship();
      this.notificationservice.showToast({ type: ToastType.Info, message: res.message });
    } catch (error: any) {
      this.notificationservice.hideLoader();
      this.notificationservice.showToast({ type: ToastType.Error, message: error.error.error });
    }
  }

  deleteModal(data: any) {
    this.displayBasic = true;
    this.relationshipsid = data._id;
  }

  goToAnswers(data: any) {
    this.router.navigate([UrlCollection.adminviewanswer], { queryParams: { id: data._id } })
  }

  async getRelationship() {
    this.notificationservice.showLoader();
    try {
      let response = await firstValueFrom(this.adminApi.getRelationships());
      this.notificationservice.hideLoader();
      this.relationships = response.relationships;
    } catch (error: any) {
      this.notificationservice.hideLoader();
      this.notificationservice.showToast({ type: ToastType.Error, message: error.error.error });
    }
  }

  async getUserRelationship(id: string) {
    this.notificationservice.showLoader();
    try {
      let response = await firstValueFrom(this.adminApi.getUserRelationships(id));
      this.notificationservice.hideLoader();
      this.relationships = response.relationships;
    } catch (error: any) {
      this.notificationservice.hideLoader();
      this.notificationservice.showToast({ type: ToastType.Error, message: error.error.error });
    }
  }

}
