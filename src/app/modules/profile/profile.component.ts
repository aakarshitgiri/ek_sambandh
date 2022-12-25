import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import { ToastType } from 'src/app/models/notification-model';
import { ApiEkSambandhService } from 'src/app/services/api-ek-sambandh.service';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { NotificationService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userData: any;
  password: FormGroup;
  profile: FormGroup;
  userDetails: FormGroup;
  updatePassword: boolean = false;
  passSubmit: boolean = false;
  updateUserProfile: boolean = false;
  profileSubmit: boolean = false;
  constructor(
    private primengConfig: PrimeNGConfig,
    private formBuilder: FormBuilder,
    private apiService: ApiEkSambandhService,
    private datastorge: DataStorageService,
    private notificationservice: NotificationService,
  ) {
    this.datastorge.currentUser.subscribe(data => {
      this.userData = data;
    })
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.userDetails = this.formBuilder.group({
      fullname: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
    });

    this.userDetails.controls['fullname'].setValue(this.userData.fullname);
    this.userDetails.controls['mobile'].setValue(this.userData.mobile);
    this.userDetails.controls['email'].setValue(this.userData.email);


    this.password = this.formBuilder.group({
      current: new FormControl('', [Validators.required]),
      newPass: new FormControl('', [Validators.required]),
      reNewPass: new FormControl('', [Validators.required])
    });

    this.profile = this.formBuilder.group({
      fullname: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required]),
    });

    this.profile.controls['fullname'].setValue(this.userData.fullname);
    this.profile.controls['mobile'].setValue(this.userData.mobile);
  }

  showPassModal() {
    this.updatePassword = true;
  }

  showProfileModal() {
    this.updateUserProfile = true;
  }

  checkpasswordMatch() {
    if (this.password.controls['newPass'].value === this.password.controls['reNewPass'].value) {
      return true;
    } else {
      return false;
    }
  }

  updatePass() {
    this.passSubmit = true;
    if (this.password.valid && this.checkpasswordMatch()) {
      this.notificationservice.showLoader();
      let oldPass = this.password.value.current;
      let newPass = this.password.value.newPass;
      try {
        this.apiService.passwordUpdate(oldPass, newPass).subscribe((res) => {
          this.updatePassword = false;
          this.notificationservice.hideLoader()
          this.notificationservice.showToast({ type: ToastType.Info, message: "Password updated Successfully!" });
        })
      } catch (error: any) {
        this.notificationservice.hideLoader();
        this.notificationservice.showToast({ type: ToastType.Error, message: error.error.message });
      }
    }
  }

  updateProfile() {
    this.profileSubmit = true;
    if (this.profile.valid) {
      this.notificationservice.showLoader();
      let fullname = this.profile.value.fullname;
      let mobile = this.profile.value.mobile;
      try {
        this.apiService.profileUpdate(fullname, mobile).subscribe((res) => {
          if (res) {
            this.updateUserProfile = false;
            this.datastorge.setUser(res.user)
            this.notificationservice.hideLoader()
            this.notificationservice.showToast({ type: ToastType.Info, message: "Profile updated Successfully!" });
            window.location.reload();
          }

        })
      } catch (error: any) {
        this.notificationservice.hideLoader();
        this.notificationservice.showToast({ type: ToastType.Error, message: error.error.message });
      }
    }
  }

}
