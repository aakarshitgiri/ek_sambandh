import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UrlCollection } from '../models/urlcollection';
import { NotificationService } from '../services/notifications.service';
import { ToastType } from '../models/notification-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(
    private router: Router,
    private notificationservice: NotificationService,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let userData = JSON.parse(sessionStorage.getItem("userData") as any)
    if (userData?._id) {
      return true;
    } else {
      this.notificationservice.showToast({ type: ToastType.Error, message: 'You are not logged in, please login first' });
      this.router.navigate([UrlCollection.Home])
      return false;
    }

  }
}
