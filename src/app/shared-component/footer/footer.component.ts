import { AfterViewInit, ChangeDetectorRef, Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import { ToastType } from '../../models/notification-model';
import { ApiEkSambandhService } from '../../services/api-ek-sambandh.service';
import { DataStorageService } from '../../services/data-storage.service';
import { NotificationService } from '../../services/notifications.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, AfterViewInit {
  disclaimerModal: boolean = false;
  helpModal: boolean = false;
  userData: any;
  isUser: boolean = false;
  submit: boolean = false;
  helpSupport: FormGroup = this.formBuilder.group({
    fullname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    contact: new FormControl('', [Validators.required]),
    reason: new FormControl('', [Validators.required])
  });
  constructor(
    private primengConfig: PrimeNGConfig,
    private formBuilder: FormBuilder,
    private apiService: ApiEkSambandhService,
    private datastorge: DataStorageService,
    private notificationservice: NotificationService
  ) {

    this.datastorge.currentUser.subscribe(data => {
      this.userData = data;

      if (this.userData?._id) {
        this.helpSupport.controls['fullname'].setValue(this.userData.fullname);
        this.helpSupport.controls['email'].setValue(this.userData.email);
        this.helpSupport.controls['contact'].setValue(this.userData.mobile);
        this.isUser = true;
      } else {
        this.helpSupport.controls['fullname'].reset();
        this.helpSupport.controls['email'].reset();
        this.helpSupport.controls['contact'].reset();
        this.isUser = false;
      }
    });
  }

  ngOnInit() {


    this.primengConfig.ripple = true;




  }

  ngAfterViewInit() {


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
          this.notificationservice.hideLoader();
          this.notificationservice.showToast({ type: ToastType.Info, message: "Thank you for contacting us, Our team will reach you out soon!" });
        });
      } catch (error: any) {
        this.notificationservice.hideLoader();
        this.notificationservice.showToast({ type: ToastType.Error, message: error.error.error });
      }
    }


  }

}
