import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ToastType } from 'src/app/models/notification-model';
import { UrlCollection } from 'src/app/models/urlcollection';
import { ApiEkSambandhService } from 'src/app/services/api-ek-sambandh.service';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { NotificationService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginforms: FormGroup;
  loginSubmit: boolean = false;
  userData: any;
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiEkSambandhService,
    private notificationservice: NotificationService,
    private router: Router,
    private datastorage: DataStorageService
  ) {
    this.datastorage.currentUser.subscribe(data => {
      this.userData = data;

    })
  }

  ngOnInit() {
    if (this.userData?._id) {
      this.router.navigate([UrlCollection.Dashboard])
    }
    this.loginforms = this.formBuilder.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  async login() {
    this.notificationservice.showLoader();
    this.loginSubmit = true;
    if (this.loginforms.valid) {
      let email = this.loginforms.value.email;
      let password = this.loginforms.value.password;
      try {
        let res = await firstValueFrom(this.apiService.login(email, password));
        if (res) {
          this.userData = res.user;
          this.datastorage.setUser(this.userData);
          this.datastorage.setToken(res.token);
          this.router.navigate([UrlCollection.Dashboard]);
          this.notificationservice.showToast({ type: ToastType.Info, message: "Login Successfully" });
          this.notificationservice.hideLoader();
        }
      } catch (error: any) {
        this.notificationservice.hideLoader();
        this.notificationservice.showToast({ type: ToastType.Error, message: error.error.error });
      }
    } else {
      this.notificationservice.hideLoader();
    }
  }

}
