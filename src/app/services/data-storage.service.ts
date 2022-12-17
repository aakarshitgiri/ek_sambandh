import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  public userData: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public token: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor() { }

  public setUser(userData: any) {
    this.userData?.next(userData);
    sessionStorage.setItem('userData', JSON.stringify(userData));
  }

  public setToken(token: string) {
    this.token?.next(token);
  }

  public clear() {
    sessionStorage.clear();
    this.userData?.next(null);
    this.token?.next(null);
  }


}
