import { Component, OnInit, NgZone, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { ToastType } from '../../models/notification-model';
import { UrlCollection } from '../..//models/urlcollection';
import { ApiEkSambandhService } from '../../services/api-ek-sambandh.service';
import { DataStorageService } from '../../services/data-storage.service';
import { NotificationService } from '../../services/notifications.service';
import { WindowRef } from '../../services/windows-ref';
import sampleQuestion from './sample-questions.json'



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  userData: any
  data: any;
  question: any[] = sampleQuestion;
  tableHeader: any[] = [
    { "field": "fullname", 'header': 'Partner Name' },
    { "field": "email", 'header': 'Partner Email' },
    { "field": "relationshipId", 'header': 'Relationship ID ' },
    { "field": "action", 'header': 'Action' }
  ]

  options: any;
  relationshipId: any;
  partnerName: any;
  readableId: string;
  addParnerPopup: boolean = false;
  addPartnerSubmit: boolean = false;
  addPartnerForm: FormGroup;
  sampleQuestion: boolean = false;


  constructor(
    private datastorge: DataStorageService,
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private formBuilder: FormBuilder,
    private winRef: WindowRef,
    private zone: NgZone,
    private apiService: ApiEkSambandhService,
    private notificationservice: NotificationService,
    private cdr: ChangeDetectorRef
  ) {
    this.datastorge.currentUser.subscribe(data => {
      this.userData = data;
    })
  }

  ngOnInit() {
    this.notificationservice.showLoader();
    this.primengConfig.ripple = true;
    this.options = {
      "key": "rzp_live_3MlSjybjKXmwGT",
      "name": 'Ek Sambandh',
      "description": 'Romantic Compatibility Test',
      "amount": 9900,
      "image": "../../../assets/images/logo-1.png",
      "prefill": {
        "name": this.userData.fullname,
        "email": this.userData.email,
        "contact": this.userData.mobile,
      },
      "notes": {
        "contact": "contact@eksambandh.in",
        "relationshipId": this.relationshipId,
        "partnerName": this.partnerName,
      },
      "theme": {
        "color": '#ab1e43'
      },
      "handler": this.paymentHandler.bind(this),
      "modal": {
        ondismiss: (() => {
          this.zone.run(() => {
            let readableId = this.readableId;
            let transactionId = " ";
            let paymentStatus = "Failed";
            let amount = 99;
            let relationshipId = this.relationshipId;
            this.apiService.paymentUpdate(transactionId, paymentStatus, amount, relationshipId, readableId).subscribe((res: any) => {
              this.getRelationship();
              this.notificationservice.showToast({ type: ToastType.Error, message: "Payment Failed" });
            })

            // add current page routing if payment fails
          })
        })
      }
    };

    this.addPartnerForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required])
    });

    this.notificationservice.hideLoader();
  }

  ngAfterViewInit() {
    this.getRelationship();
    this.cdr.detectChanges();
  }

  getRelationship() {
    this.notificationservice.showLoader()
    try {
      this.apiService.getRelationship().subscribe((res: any) => {
        this.notificationservice.hideLoader();
        this.data = res.relationships;
      })
    } catch (error: any) {
      this.notificationservice.hideLoader();
      this.notificationservice.showToast({ type: ToastType.Error, message: error.error.error });
    }
  }

  takeTest(data: any) {
    this.router.navigate([UrlCollection.LoveTest], { queryParams: { id: data.relationshipId } });
  }

  viewResults(data: any) {
    this.router.navigate([UrlCollection.Result], { queryParams: { id: data.relationshipId, user: this.userData.fullname, partner: data.partner.fullname } });
  }


  remindsPartner(data: any) {
    this.notificationservice.showLoader();
    try {
      this.apiService.remindPartner(data.partner.fullname, data.partner.email, data.relationshipId).subscribe((res) => {
        this.notificationservice.hideLoader();
        this.getRelationship();
        this.notificationservice.showToast({ type: ToastType.Info, message: res.message });
      })
    } catch (error: any) {
      this.notificationservice.hideLoader();
      this.notificationservice.showToast({ type: ToastType.Error, message: error.error.error });
    }
  }

  viewQuestion() {
    this.sampleQuestion = true;
  }

  payFees(data: any, id: string) {
    this.readableId = id
    this.relationshipId = data.relationshipId;
    this.partnerName = data.partner?.fullname || 'not registered'
    let rzp1 = new this.winRef.nativeWindow.Razorpay(this.options);
    rzp1.open()

  }


  paymentHandler(res: any) {
    this.zone.run(() => {
      // add API call here
      if (res.razorpay_payment_id) {
        let readableId = this.readableId;
        let transactionId = res.razorpay_payment_id;
        let paymentStatus = "Success";
        let amount = 99;
        let relationshipId = this.relationshipId;
        this.apiService.paymentUpdate(transactionId, paymentStatus, amount, relationshipId, readableId).subscribe((res: any) => {
          this.getRelationship();
          this.notificationservice.showToast({ type: ToastType.Info, message: "Payment Successfull" });
        })
      }
    });
  }

  addPartner() {
    this.addPartnerSubmit = true;
    if (this.addPartnerForm.valid) {
      this.addParnerPopup = false;
      this.notificationservice.showLoader();
      let email = this.addPartnerForm.value.email;
      try {
        this.apiService.addPartner(email).subscribe((res: any) => {

          if (res) {
            this.notificationservice.hideLoader();
            this.getRelationship();
            this.notificationservice.showToast({ type: ToastType.Info, message: res.message });
          }
        })
      } catch (error: any) {
        this.notificationservice.hideLoader();
        this.notificationservice.showToast({ type: ToastType.Error, message: error.error.error });
      }
    }
  }

  addPartnerModal() {
    this.addParnerPopup = true;
  }

  resentInvite(data: any) {
    this.notificationservice.showLoader();
    let email
    if (data?.partnerEmail) {
      email = data.partnerEmail;
    } else {
      email = data.partner.email;
    }

    try {
      this.apiService.addPartner(email).subscribe((res: any) => {

        if (res) {
          this.notificationservice.hideLoader();
          this.getRelationship();
          this.notificationservice.showToast({ type: ToastType.Info, message: res.message });
        }
      })
    } catch (error: any) {
      this.notificationservice.hideLoader();
      this.notificationservice.showToast({ type: ToastType.Error, message: error.error.error });
    }
  }

  delete(data: any) {
    this.notificationservice.showLoader();
    try {
      this.apiService.deleteRelationship(data.relationshipId).subscribe((res: any) => {
        this.notificationservice.hideLoader();
        this.getRelationship();
        this.notificationservice.showToast({ type: ToastType.Info, message: res.message })
      })
    } catch (error: any) {
      this.notificationservice.hideLoader();
      this.notificationservice.showToast({ type: ToastType.Error, message: error.error.error });
    }

  }





}
