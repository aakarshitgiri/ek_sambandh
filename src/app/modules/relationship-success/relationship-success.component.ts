import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastType } from 'src/app/models/notification-model';
import { UrlCollection } from 'src/app/models/urlcollection';
import { ApiEkSambandhService } from 'src/app/services/api-ek-sambandh.service';
import { NotificationService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-relationship-success',
  templateUrl: './relationship-success.component.html',
  styleUrls: ['./relationship-success.component.scss']
})
export class RelationshipSuccessComponent implements OnInit {

  timeLeft: number = 5;
  interval: any;
  btnvisble: boolean = false;
  relationshipId: string;
  show: boolean = false;

  constructor(
    private _activateroute: ActivatedRoute,
    private apiService: ApiEkSambandhService,
    private router: Router,
    private notificationservice: NotificationService,
  ) { }

  ngOnInit() {
    this.relationshipId = this._activateroute.snapshot.queryParams['relationshipId'];
    if (this.relationshipId) {
      try {
        this.apiService.relationshipAccept(this.relationshipId).subscribe((res) => {
          this.show = true;
          this.notificationservice.showToast({ type: ToastType.Info, message: res.message });
          this.startTimer();
        })
      } catch (error: any) {
        this.show = false;
        this.notificationservice.showToast({ type: ToastType.Error, message: error.error.error });
      }
    } else {
      this.show = false;
      this.notificationservice.showToast({ type: ToastType.Error, message: 'Invalid Request' });
      this.router.navigate([UrlCollection.Login])
    }
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.btnvisble = false;
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.btnvisble = true;
      }
    }, 1000)
  }
  disablebtn() {
    if (this.timeLeft !== 0) {
      this.btnvisble = false;
      return true;
    } else {
      this.btnvisble = true;
      return false;
    }
  }

  redirectToLogin() {
    this.router.navigate([UrlCollection.Login])
  }

}
