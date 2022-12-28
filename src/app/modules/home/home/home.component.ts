import { Component, OnInit } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ToastType } from 'src/app/models/notification-model';
import { NotificationService } from 'src/app/services/notifications.service';
import * as AOS from 'aos';
import { Router } from '@angular/router';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { UrlCollection } from 'src/app/models/urlcollection';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  events1: any[];
  activeState: boolean[] = [true, false, false];
  team: any[] = [
    {
      'name': 'Rohit Kapoor', 'about': "Entrepreneur with a successful track record in the e-learning industry. Founder of Commerce Vidya (embedded technology in education), YouTuber, career coach, and educator."
    },
    {
      'name': 'Yamini Singh (Engineer)', 'about': "Skills in Business Development, Revenue Forecasting, Project Strategy, Operational Excellence, Sales & Marketing Operations."
    },
    {
      'name': 'Vishesh Singh (Engineer)', 'about': "Possess strong presentation, communication, customer relationship management. Skilled in Generating new business with marketing initiatives and strategic plans."
    },
    {
      'name': 'Shubham Bhatia M.com(Hons.)', 'about': "Accounting and Finance. A working professional with commercial, branding, accounting, and investment banking expertise."
    }
  ]
  userData: any;
  constructor(
    private readonly notificationService: NotificationService,
    private router: Router,
    private datastorge: DataStorageService,
    private notificationservice: NotificationService
  ) {
    this.datastorge.currentUser.subscribe(data => {
      this.userData = data;
    })
  }

  ngOnInit() {
    AOS.init();
    this.events1 = [
      {
        status: 'Creat Account with Ek Sambandh',
        icon: PrimeIcons.USER_PLUS,
        details: 'Create your free account with Ek Sambandh and Unlock the unbelieable features of Ek Sambandh.',
        color: '#ab1e43',
      },
      {
        status: 'Login with Ek Sambandh',
        icon: PrimeIcons.USER,
        details: 'Login with your Email & Unique Password to view features of Ek Sambandh',
        color: '#ab1e43',
      },
      {
        status: 'Invite your Partner to Ek Sambandh',
        icon: PrimeIcons.USERS,
        details: 'Invite your partner to Ek Sambandh to attempt compatibility test of your',
        color: '#ab1e43',
      },
      {
        status: 'Pay Fees for the Test',
        icon: PrimeIcons.MONEY_BILL,
        details: "Pay just Rs.99 for the Uniques Test that will be between you & your partner to check the compitability, also with our unique algorithm you will get compitability score on your dashboard as well as at your and your partner's Email",
        color: '#ab1e43',
      },
      {
        status: 'Complete the Test',
        icon: PrimeIcons.BOOK,
        details: 'Attempt the test to see the best compatibility results regarding your relationship.',
        color: '#ab1e43',
      },
      {
        status: 'View & Download Results',
        icon: PrimeIcons.EYE,
        details: 'View the results at your dashboard as well as at your Email. You can also download or share this results with your closet one.',
        color: '#ab1e43',
      },
    ];
  }

  takeTestNow() {
    if (this.userData?._id) {
      this.router.navigate([UrlCollection.Dashboard])
    } else {
      this.router.navigate([UrlCollection.Login]);
      this.notificationservice.showToast({ type: ToastType.Info, message: "Please login first!" });
    }
  }

}
