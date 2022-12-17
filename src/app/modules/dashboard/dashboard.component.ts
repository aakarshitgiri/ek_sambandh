import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ToastType } from 'src/app/models/notification-model';
import { UrlCollection } from 'src/app/models/urlcollection';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { NotificationService } from 'src/app/services/notifications.service';
import { WindowRef } from 'src/app/services/windows-ref';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userData: any

  data: any = [
    {
      'fullname': 'Aakarshit Giri',
      'partnerName': 'Deepika Padukone',
      'Email': 'aakarshitgiri@mailinator.com',
      'partnerEmail': 'deepikapadukone@mailinator.com',
      'relationshipStatus': true,
      'relationshipID': 'Relationship-01',
      'feeStatus': true,
      'formStatus': true,
      'partnerFormStatus': true,
      'relationshipForm': {
        0: [
          {
            'question': 'qwertyui jfiuehfie hueiwfr huier hduiehfowe',
            'answer': 'yes',
            'score': '100%'
          }
        ],
        1: [
          {
            'question': 'qwertyui jfiuehfie hueiwfr huier hduiehfowe',
            'answer': 'yes',
            'score': '100%'
          }
        ],
        2: [
          {
            'question': 'qwertyui jfiuehfie hueiwfr huier hduiehfowe',
            'answer': 'yes',
            'score': '100%'
          }
        ]
      }
    },
    {
      'fullname': 'Aakarshit Giri',
      'partnerName': 'Kriti Sonon',
      'Email': 'aakarshitgiri@mailinator.com',
      'partnerEmail': 'kritisonon@mailinator.com',
      'relationshipStatus': false,
      'relationshipID': 'Relationship-02',
      'feeStatus': true,
      'formStatus': true,
      'partnerFormStatus': true,
      'relationshipForm': {
        0: [
          {
            'question': 'qwertyui jfiuehfie hueiwfr huier hduiehfowe',
            'answer': 'yes',
            'score': '100%'
          }
        ],
        1: [
          {
            'question': 'qwertyui jfiuehfie hueiwfr huier hduiehfowe',
            'answer': 'yes',
            'score': '100%'
          }
        ],
        2: [
          {
            'question': 'qwertyui jfiuehfie hueiwfr huier hduiehfowe',
            'answer': 'yes',
            'score': '100%'
          }
        ]
      }
    },
    {
      'fullname': 'Aakarshit Giri',
      'partnerName': 'Alia Bhatt',
      'Email': 'aakarshitgiri@mailinator.com',
      'partnerEmail': 'aliabhatt@mailinator.com',
      'relationshipStatus': true,
      'relationshipID': 'Relationship-03',
      'feeStatus': false,
      'formStatus': true,
      'partnerFormStatus': true,
      'relationshipForm': {
        0: [
          {
            'question': 'qwertyui jfiuehfie hueiwfr huier hduiehfowe',
            'answer': 'yes',
            'score': '100%'
          }
        ],
        1: [
          {
            'question': 'qwertyui jfiuehfie hueiwfr huier hduiehfowe',
            'answer': 'yes',
            'score': '100%'
          }
        ],
        2: [
          {
            'question': 'qwertyui jfiuehfie hueiwfr huier hduiehfowe',
            'answer': 'yes',
            'score': '100%'
          }
        ]
      }
    },
    {
      'fullname': 'Aakarshit Giri',
      'partnerName': 'Scarlett Johansson',
      'Email': 'aakarshitgiri@mailinator.com',
      'partnerEmail': 'scarletjohansson@mailinator.com',
      'relationshipStatus': true,
      'relationshipID': 'Relationship-04',
      'feeStatus': true,
      'formStatus': false,
      'partnerFormStatus': true,
      'relationshipForm': {
        0: [
          {
            'question': 'qwertyui jfiuehfie hueiwfr huier hduiehfowe',
            'answer': 'yes',
            'score': '100%'
          }
        ],
        1: [
          {
            'question': 'qwertyui jfiuehfie hueiwfr huier hduiehfowe',
            'answer': 'yes',
            'score': '100%'
          }
        ],
        2: [
          {
            'question': 'qwertyui jfiuehfie hueiwfr huier hduiehfowe',
            'answer': 'yes',
            'score': '100%'
          }
        ]
      }
    },
    {
      'fullname': 'Aakarshit Giri',
      'partnerName': 'Alexandra Daddario',
      'Email': 'aakarshitgiri@mailinator.com',
      'partnerEmail': 'alexandradaddario@mailinator.com',
      'relationshipStatus': true,
      'relationshipID': 'Relationship-05',
      'feeStatus': true,
      'formStatus': true,
      'partnerFormStatus': false,
      'relationshipForm': {
        0: [
          {
            'question': 'qwertyui jfiuehfie hueiwfr huier hduiehfowe',
            'answer': 'yes',
            'score': '100%'
          }
        ],
        1: [
          {
            'question': 'qwertyui jfiuehfie hueiwfr huier hduiehfowe',
            'answer': 'yes',
            'score': '100%'
          }
        ],
        2: [
          {
            'question': 'qwertyui jfiuehfie hueiwfr huier hduiehfowe',
            'answer': 'yes',
            'score': '100%'
          }
        ]
      }
    }
  ];


  options = {
    "key": "rzp_test_Ey6vrOQSuNtqJM",
    "name": 'Ek Sambandh',
    "description": 'Romantic Compatibility Test',
    "amount": 9900,
    "image": "../../../assets/images/logo-1.png",
    "prefill": {
      "name": "",
      "email": ""
    },
    "notes": {
      "contact": "contact@eksambandh.in",
      "relationshipId": "",
      "userId": "",
      "partnerId": ""
    },
    "theme": {
      "color": '#ab1e43'
    },
    "handler": this.paymentHandler.bind(this),
    "modal": {
      ondismiss: (() => {
        this.zone.run(() => {
          this.notificationservice.showToast({ type: ToastType.Error, message: "Payment Failed" });
          // add current page routing if payment fails
        })
      })
    }
  };





  constructor(
    private datastorge: DataStorageService,
    private router: Router,
    private winRef: WindowRef,
    private zone: NgZone,
    private notificationservice: NotificationService,
  ) {
    this.datastorge.userData.subscribe(data => {
      this.userData = data;
    })
  }

  ngOnInit() {
  }


  tableButton(data: any) {
    if (data.relationshipStatus) {
      if (data.feeStatus) {
        if (data.formStatus) {
          if (data.partnerFormStatus) {
            this.router.navigate([UrlCollection.Result]);
          } else {
            this.remindsPartner(data);
          }
        } else {
          this.router.navigate([UrlCollection.LoveTest]);
        }
      } else {
        this.payFees(data);
      }
    } else {
      this.resentInvite(data);
    }
  }


  remindsPartner(data: any) {

  }

  payFees(data: any) {
    let rzp1 = new this.winRef.nativeWindow.Razorpay(this.options);
    rzp1.open()

  }


  paymentHandler(res: any) {
    this.zone.run(() => {
      // add API call here
      if (res.razorpay_payment_id) {

      }
    });
  }

  resentInvite(data: any) {

  }

  delete(data: any) {

  }





}
