import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  public userData: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  token: string;
  constructor() { }

  public setUser(userData: any) {
    this.userData?.next(userData);
    sessionStorage.setItem('userData', JSON.stringify(userData));
  }

  public setToken(token: string) {
    this.token = token;
    sessionStorage.setItem('token', JSON.stringify(token));
  }

  /*  public getToken() {
     sessionStorage.setItem('token', JSON.stringify(this.token));
     return this.token;
   } */

  public clear() {
    sessionStorage.clear();
    this.userData?.next(null);
    this.token = '';
  }


}
