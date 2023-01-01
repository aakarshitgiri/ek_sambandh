import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastType } from 'src/app/models/notification-model';
import { ApiEkSambandhService } from 'src/app/services/api-ek-sambandh.service';
import { NotificationService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgetPass: FormGroup;
  forgetSubmit: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiEkSambandhService,
    private notificationservice: NotificationService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.forgetPass = this.formBuilder.group({
      email: new FormControl('', [Validators.required])
    });
  }

  forgetPassSubmit() {
    this.forgetSubmit = false;
    if (this.forgetPass.valid) {
      this.notificationservice.showLoader();
      let email = this.forgetPass.value.email;
      try {
        this.apiService.forgetPass(email).subscribe((res) => {
          this.notificationservice.hideLoader();
          this.notificationservice.showToast({ type: ToastType.Info, message: res.message });
        })
      } catch (error: any) {
        this.notificationservice.hideLoader();
        this.notificationservice.showToast({ type: ToastType.Error, message: error.error.error });
      }
    }
  }

}
