import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UrlCollection } from '../models/urlcollection';
import { NotificationService } from '../services/notifications.service';
import { ToastType } from '../models/notification-model';


@Injectable({
  providedIn: 'root'
})
export class NonAdminRouteService {

  constructor(
    private router: Router,
    private notificationservice: NotificationService,
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let userData = JSON.parse(sessionStorage.getItem("userData") as any)
    if (userData?.userRole !== "ADMIN") {
      return true;
    } else {
      this.router.navigate([UrlCollection.admindashboard])
      return false;
    }

  }
}
