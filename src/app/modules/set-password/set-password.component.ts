import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastType } from 'src/app/models/notification-model';
import { UrlCollection } from 'src/app/models/urlcollection';
import { ApiEkSambandhService } from 'src/app/services/api-ek-sambandh.service';
import { NotificationService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent implements OnInit {
  setPass: FormGroup;
  userData: any;
  setSubmit: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiEkSambandhService,
    private notificationservice: NotificationService,
    private _activateroute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    const verifyToken = this._activateroute.snapshot.queryParams['token'];
    if (verifyToken) {
      try {
        this.apiService.verifyForgetToken(verifyToken).subscribe((res: any) => {
          this.userData = res.user
        });
      } catch (error: any) {
        this.router.navigate([UrlCollection.Login])
        this.notificationservice.showToast({ type: ToastType.Error, message: error });
      }
    } else {
      this.router.navigate([UrlCollection.Login])
    }


    this.setPass = this.formBuilder.group({
      password: new FormControl('', [Validators.required]),
      repassword: new FormControl('', [Validators.required])
    })
  }

  checkpasswordMatch() {
    if (this.setPass.controls['password'].value === this.setPass.controls['repassword'].value) {
      return true;
    } else {
      return false;
    }
  }

  setpass() {
    this.setSubmit;
    if (this.setPass.valid && this.checkpasswordMatch()) {
      this.notificationservice.showLoader();
      try {
        let pass = this.setPass.value.password;
        let id = this.userData._id;
        this.apiService.settPass(pass, id).subscribe((res) => {
          this.notificationservice.hideLoader();
          this.notificationservice.showToast({ type: ToastType.Info, message: res.message });
          this.router.navigate([UrlCollection.Login])
        })
      } catch (error: any) {
        this.notificationservice.hideLoader();
        this.notificationservice.showToast({ type: ToastType.Error, message: error.error.message });
      }
    }
  }

}
