import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ToastType } from 'src/app/models/notification-model';
import { UrlCollection } from 'src/app/models/urlcollection';
import { ApiEkSambandhService } from 'src/app/services/api-ek-sambandh.service';
import { NotificationService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupform: FormGroup;
  submitEmail: boolean = false;
  submitForm: boolean = false;
  emailDisable: boolean = false;
  emailVerified: boolean = false;
  hideSendBtn: boolean = false;
  timeLeft: number = 60;
  interval: any;
  btnvisble: boolean = false;
  isPartnerLogin: boolean = false;
  relationshipId: any;

  constructor(
    private formbuilder: FormBuilder,
    private apiService: ApiEkSambandhService,
    private notificationservice: NotificationService,
    private router: Router,
    private _activateroute: ActivatedRoute,
  ) { }

  ngOnInit() {
    const verifyPartnerToken = this._activateroute.snapshot.queryParams['token'];
    const verifyPartnerEmail = this._activateroute.snapshot.queryParams['email'];

    this.signupform = this.formbuilder.group({
      email: new FormControl('', [Validators.required]),
      otp: new FormControl('', [Validators.required]),
      fullname: new FormControl('', [Validators.required]),
      mobile: new FormControl(''),
      password: new FormControl('', [Validators.required]),
      repassword: new FormControl('', [Validators.required]),
      partneremail: new FormControl(''),
      isPartner: new FormControl(false),
      termsandcondition: new FormControl('', [Validators.required]),
    });

    this.signupform.controls['fullname'].disable();
    this.signupform.controls['mobile'].disable();
    this.signupform.controls['password'].disable();
    this.signupform.controls['repassword'].disable();
    this.signupform.controls['partneremail'].disable();
    this.signupform.controls['isPartner'].disable();
    this.signupform.controls['termsandcondition'].disable();

    if (verifyPartnerToken) {
      this.apiService.verifyToken(verifyPartnerToken).subscribe((res: any) => {
        this.isPartnerLogin = true;
        this.emailDisable = true;
        this.signupform.controls['email'].setValue(verifyPartnerEmail)
        let email = verifyPartnerEmail;
        this.relationshipId = res.relationshipId;
        this.signupform.controls['otp'].disable();
        this.signupform.controls['fullname'].enable();
        this.signupform.controls['mobile'].enable();
        this.signupform.controls['password'].enable();
        this.signupform.controls['repassword'].enable();
        this.signupform.controls['termsandcondition'].enable();
      })
    }
  }

  enableForm() {
    this.signupform.controls['fullname'].enable();
    this.signupform.controls['mobile'].enable();
    this.signupform.controls['password'].enable();
    this.signupform.controls['repassword'].enable();
    this.signupform.controls['partneremail'].enable();
    this.signupform.controls['isPartner'].enable();
    this.signupform.controls['termsandcondition'].enable();
  }

  checkpasswordMatch() {
    if (this.signupform.controls['password'].value === this.signupform.controls['repassword'].value) {
      return true;
    } else {
      return false;
    }
  }

  validateEmail() {
    if (this.signupform.controls['isPartner'].value) {
      if (this.signupform.controls['email'].value === this.signupform.controls['partneremail'].value) {
        return false;
      } else {
        return true
      }
    } else {
      return true;
    }
  }

  async sendOtp() {
    this.notificationservice.showLoader();
    this.submitEmail = true;
    if (this.signupform.controls['email'].valid) {
      let reqObj = this.signupform.value.email
      try {
        let res = await firstValueFrom(this.apiService.verifyEmail(reqObj));
        this.notificationservice.hideLoader();
        console.log(res)
        if (res) {
          this.startTimer();
          this.emailDisable = true;
          this.hideSendBtn = true;
          this.btnvisble = false;

          this.notificationservice.showToast({ type: ToastType.Info, message: res.message });
        }

      } catch (error: any) {
        this.notificationservice.hideLoader();
        this.notificationservice.showToast({ type: ToastType.Error, message: error.error.message });
      }

    } else {
      this.notificationservice.hideLoader();
      this.notificationservice.showToast({ type: ToastType.Error, message: 'Enter Correct Email' });
    }

  }

  async verifyOtp() {
    this.notificationservice.showLoader();
    if (this.signupform.controls['otp'].valid) {
      let email = this.signupform.value.email;
      let otp = this.signupform.value.otp;
      try {
        let res = await firstValueFrom(this.apiService.verifyOtp(email, otp));
        this.notificationservice.hideLoader();
        console.log(res)
        if (res) {
          this.emailVerified = true;
          this.enableForm()
          this.notificationservice.showToast({ type: ToastType.Info, message: res.message });
        }

      } catch (error: any) {
        this.notificationservice.hideLoader();
        this.notificationservice.showToast({ type: ToastType.Error, message: error.error.message });
      }

    } else {
      this.notificationservice.hideLoader();
      this.notificationservice.showToast({ type: ToastType.Error, message: 'Enter Valid OTP' });
    }
  }

  partnerCheckbox(event: any) {
    if (event.checked) {
      this.signupform.controls['partneremail'].setValidators([Validators.required]);
      this.signupform.controls['partneremail'].updateValueAndValidity();
    } else {
      this.signupform.controls['partneremail'].clearValidators();
      this.signupform.controls['partneremail'].updateValueAndValidity();
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

  async signup() {
    this.notificationservice.showLoader();
    this.submitForm = true;
    console.log(this.signupform.valid, this.signupform.value)
    if (this.signupform.valid && this.checkpasswordMatch() && this.validateEmail() && !this.isPartnerLogin) {
      let email = this.signupform.value.email;
      let fullname = this.signupform.value.fullname;
      let mobile = this.signupform.value.mobile;
      let password = this.signupform.value.password;
      let addPartner = this.signupform.value.isPartner;
      let partnerEmail = this.signupform.value.partneremail
      try {
        let res = await firstValueFrom(this.apiService.createAccount(fullname, email, password, addPartner, partnerEmail, mobile));
        this.notificationservice.hideLoader();
        console.log(res)
        if (res) {
          this.notificationservice.showToast({ type: ToastType.Info, message: "Account created Successfully !" });
          this.router.navigate([UrlCollection.Login]);
        }

      } catch (error: any) {
        this.notificationservice.hideLoader();
        this.notificationservice.showToast({ type: ToastType.Error, message: error.error.message });
      }

    } else if (this.isPartnerLogin && this.signupform.valid && this.checkpasswordMatch()) {
      let fullname = this.signupform.value.fullname;
      let email = this.signupform.value.email;
      let password = this.signupform.value.password;
      let mobile = this.signupform.value.mobile;
      let relationshipId = this.relationshipId;
      let res = await firstValueFrom(this.apiService.createPartner(fullname, email, password, relationshipId, mobile));
      this.notificationservice.hideLoader();
      if (res) {
        this.notificationservice.showToast({ type: ToastType.Info, message: "Account created Successfully !" });
        this.router.navigate([UrlCollection.Login]);
      }
    } else {
      this.notificationservice.hideLoader();
      this.notificationservice.showToast({ type: ToastType.Error, message: 'Complete form first!' });
    }


  }

}
