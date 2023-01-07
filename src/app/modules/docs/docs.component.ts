import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlCollectionName } from 'src/app/models/urlcollection';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss']
})
export class DocsComponent implements OnInit {
  title: string;
  termscondition: boolean = false;
  privacypolicy: boolean = false;
  refundPolicy: boolean = false;
  constructor(
    private activaterouter: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    let route = this.activaterouter.snapshot.routeConfig?.path;
    if (route === UrlCollectionName.termsCondition) {
      this.title = 'Terms & Conditions'
      this.termscondition = true;
    } else if (route === UrlCollectionName.privacyPolicy) {
      this.title = 'Privacy & Policy'
      this.privacypolicy = true;
    } else if (route === UrlCollectionName.refundPolicy) {
      this.title = 'Refund Policy'
      this.refundPolicy = true;
    }
  }

}
