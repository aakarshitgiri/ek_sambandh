import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  private userData: BehaviorSubject<any> = new BehaviorSubject<any>({});
  currentUser = this.userData.asObservable();
  token: string;
  public questionLevelOne: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public questionLevelTwo: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public questionLevelThree: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public questionLevelFour: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public questionLevelFive: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor() { }

  public setUser(userData: any) {
    this.userData.next(userData);
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
    this.userData?.next({});
    this.token = '';
    sessionStorage.clear();
  }


  public setQuestionLevelOne(questionSet1: any[]) {
    this.questionLevelOne.next(questionSet1);
    sessionStorage.setItem('level1', JSON.stringify(questionSet1));
  }

  public setQuestionLevelTwo(questionSet2: any[]) {
    this.questionLevelTwo.next(questionSet2)
    sessionStorage.setItem('level2', JSON.stringify(questionSet2));
  }

  public setQuestionLevelThree(questionSet3: any[]) {
    this.questionLevelThree.next(questionSet3)
    sessionStorage.setItem('level3', JSON.stringify(questionSet3));
  }

  public setQuestionLevelFour(questionSet4: any[]) {
    this.questionLevelFour.next(questionSet4)
    sessionStorage.setItem('level4', JSON.stringify(questionSet4));
  }


}
