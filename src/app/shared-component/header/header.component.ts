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
  isAdmin: boolean = false;
  constructor(
    private datastorage: DataStorageService,
    private router: Router
  ) {
    this.datastorage.currentUser.subscribe((data: any) => {
      this.userData = data;
      if (this.userData?.userRole === "ADMIN") {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    });
  }

  ngOnInit() {

  }

  goToHome() {
    this.router.navigate([UrlCollection.Home])
  }

  logout() {
    this.display = false;
    this.datastorage.clear();
    this.datastorage.setUser({})
    this.router.navigate([UrlCollection.Home]);
  }

}
