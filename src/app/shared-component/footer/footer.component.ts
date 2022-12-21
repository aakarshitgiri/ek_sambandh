import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import { ToastType } from 'src/app/models/notification-model';
import { ApiEkSambandhService } from 'src/app/services/api-ek-sambandh.service';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { NotificationService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  helpSupport: FormGroup;
  helpModal: boolean = false;
  userData: any;
  isUser: boolean = false;
  submit: boolean = false;
  constructor(
    private primengConfig: PrimeNGConfig,
    private formBuilder: FormBuilder,
    private apiService: ApiEkSambandhService,
    private datastorge: DataStorageService,
    private notificationservice: NotificationService,
    private cdr: ChangeDetectorRef
  ) {
    this.datastorge.userData.subscribe(data => {
      this.userData = data;
    });


  }

  ngOnInit() {


    this.primengConfig.ripple = true;
    this.helpSupport = this.formBuilder.group({
      fullname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      contact: new FormControl('', [Validators.required]),
      reason: new FormControl('', [Validators.required])
    });

    if (this.userData?._id) {
      this.helpSupport.controls['fullname'].setValue(this.userData.fullname);
      this.helpSupport.controls['email'].setValue(this.userData.email);
      this.helpSupport.controls['contact'].setValue(this.userData.mobile);
      this.isUser = true;
    }

  }





  showHelpModal() {
    this.helpModal = true;
  }

  send() {
    this.submit = true;
    let fullname = this.helpSupport.value.fullname;
    let email = this.helpSupport.value.email;
    let contact = this.helpSupport.value.contact;
    let reason = this.helpSupport.value.reason
    if (this.helpSupport.valid) {
      this.helpModal = false;
      this.notificationservice.showLoader();
      try {
        this.apiService.helpSupport(fullname, email, reason, contact).subscribe((res: any) => {
          console.log(res)

          this.notificationservice.hideLoader();
          this.notificationservice.showToast({ type: ToastType.Info, message: "Thank you for contacting us, Our team will reach you out soon!" });
        });
      } catch (error: any) {
        this.notificationservice.hideLoader();
        this.notificationservice.showToast({ type: ToastType.Error, message: error });
      }
    }


  }

}
