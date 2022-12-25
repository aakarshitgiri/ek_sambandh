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
  display: boolean;
  constructor(
    private datastorage: DataStorageService,
    private router: Router
  ) {
    this.datastorage.currentUser.subscribe((data: any) => {
      this.userData = data;
    });
  }

  ngOnInit() {

  }

  logout() {
    this.display = false;
    this.datastorage.clear();
    this.datastorage.setUser({})
    this.router.navigate([UrlCollection.Home]);
  }

}
