import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { ToastType } from 'src/app/models/notification-model';
import { UrlCollection } from 'src/app/models/urlcollection';
import { ApiEkSambandhService } from 'src/app/services/api-ek-sambandh.service';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { NotificationService } from 'src/app/services/notifications.service';
import { WindowRef } from 'src/app/services/windows-ref';
import sampleQuestion from './sample-questions.json'



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
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
  ) {
    this.datastorge.userData.subscribe(data => {
      this.userData = data;
    })
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.options = {
      "key": "rzp_test_Ey6vrOQSuNtqJM",
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

    this.apiService.getRelationship().subscribe((res: any) => {
      this.data = res.relationships;
    })
  }


  tableButton(data: any, id: string) {
    if (data.relationshipStatus !== "Requested") {
      if (data.feeStatus) {
        if (data.userForm[0]) {
          if (data.partnerForm[0]) {
            this.router.navigate([UrlCollection.Result]);
          } else {
            this.remindsPartner(data);
          }
        } else {
          this.router.navigate([UrlCollection.LoveTest]);
        }
      } else {
        this.payFees(data, id);
      }
    } else {
      this.resentInvite(data);
    }
  }


  remindsPartner(data: any) {

  }

  viewQuestion() {
    this.sampleQuestion = true;
  }

  payFees(data: any, id: string) {
    this.readableId = id
    this.relationshipId = data.relationshipId;
    this.partnerName = data.partner.fullname
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
            this.notificationservice.showToast({ type: ToastType.Info, message: res.message });
          }
        })
      } catch (error: any) {
        console.log(error)
        this.notificationservice.hideLoader();
        this.notificationservice.showToast({ type: ToastType.Error, message: "an error occured" });
      }
    }
  }

  addPartnerModal() {
    this.addParnerPopup = true;
  }

  resentInvite(data: any) {
    this.notificationservice.showLoader();
    let email = data.partnerEmail;
    try {
      this.apiService.addPartner(email).subscribe((res: any) => {

        if (res) {
          this.notificationservice.hideLoader();
          this.notificationservice.showToast({ type: ToastType.Info, message: res.message });
        }
      })
    } catch (error: any) {
      console.log(error)
      this.notificationservice.hideLoader();
      this.notificationservice.showToast({ type: ToastType.Error, message: "an error occured" });
    }
  }

  delete(data: any) {
    this.notificationservice.showLoader();
    try {
      this.apiService.deleteRelationship(data.relationshipId).subscribe((res: any) => {
        this.notificationservice.hideLoader();
        this.notificationservice.showToast({ type: ToastType.Info, message: res.message })
      })
    } catch (error: any) {
      console.log(error)
      this.notificationservice.hideLoader();
      this.notificationservice.showToast({ type: ToastType.Error, message: "an error occured" });
    }

  }





}
