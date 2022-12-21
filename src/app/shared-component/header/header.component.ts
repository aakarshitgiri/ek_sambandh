import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UrlCollection } from 'src/app/models/urlcollection';
import { DataStorageService } from 'src/app/services/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userData: any;
  constructor(
    private datastorage: DataStorageService,
    private router: Router
  ) {
    this.datastorage.userData.subscribe((data: any) => {
      this.userData = data;
    });
  }

  ngOnInit() {

  }

  logout() {
    this.datastorage.clear();
    this.datastorage.userData.next({})
    this.router.navigate([UrlCollection.Home])
  }

}
