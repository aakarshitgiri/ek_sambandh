import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { CreateAccount, IUser } from '../models/enums';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataStorageService } from './data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiEkSambandhService {
  token: string;

  constructor(
    private http: HttpClient,
    private dataStorge: DataStorageService
  ) {

  }

  public createAccount(fullname: string, email: string, password: string, addPartner?: boolean, partnerEmail?: string, mobile?: string): Observable<any> {
    const url: string = `${environment.apiUrl.ekSambandhUrl}/signup`;

    const httpResponse: any = this.http.post<any>(url, { fullname, email, password, addPartner, partnerEmail, mobile });
    return httpResponse;
  }


  public verifyEmail(email: string): Observable<any> {
    const url: string = `${environment.apiUrl.ekSambandhUrl}/user/verificationRequest`;

    const httpResponse: any = this.http.post<any>(url, { email });
    return httpResponse;
  }

  public verifyOtp(email: string, otp: string): Observable<any> {
    const url: string = `${environment.apiUrl.ekSambandhUrl}/user/verifyOtp`;

    const httpResponse: any = this.http.post<any>(url, { email, otp });
    return httpResponse;
  }

  public login(email: string, password: string): Observable<any> {
    const url: string = `${environment.apiUrl.ekSambandhUrl}/login`;

    const httpResponse: any = this.http.post<any>(url, { email, password });
    return httpResponse;
  }

  public verifyToken(token: string): Observable<any> {
    const url: string = `${environment.apiUrl.ekSambandhUrl}/partner/verify/${token}`;

    const httpResponse: any = this.http.get<any>(url);
    return httpResponse;
  }

  public createPartner(fullname: string, email: string, password: string, relationshipId: string, mobile: string): Observable<any> {
    const url: string = `${environment.apiUrl.ekSambandhUrl}/partner/signup`;

    const httpResponse: any = this.http.post<any>(url, { fullname, email, password, relationshipId, mobile });
    return httpResponse;
  }

  public getRelationship(): Observable<any> {
    const url: string = `${environment.apiUrl.ekSambandhUrl}/user/relationship/all`;
    const headers = {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + JSON.parse(sessionStorage?.getItem('token') as string),
    }
    const httpResponse: any = this.http.get<any>(url, { headers });
    return httpResponse;
  }

  public relationshipAccept(relationshipid: string): Observable<any> {
    const url: string = `${environment.apiUrl.ekSambandhUrl}/user/relationship/accept/${relationshipid}`;

    const httpResponse: any = this.http.post<any>(url, {});
    return httpResponse;
  }


  public paymentUpdate(transactionId: string, paymentStatus: string, amount: number, relationshipId: string, readableId: string): Observable<any> {
    const url: string = `${environment.apiUrl.ekSambandhUrl}/user/payment/add/${relationshipId}`;
    const headers = {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + JSON.parse(sessionStorage?.getItem('token') as string),
    }
    const httpResponse: any = this.http.post<any>(url, { transactionId, paymentStatus, amount, readableId }, { headers });
    return httpResponse;
  }


  public getPaymentDetails(): Observable<any> {
    const url: string = `${environment.apiUrl.ekSambandhUrl}/user/payments/all`;
    const headers = {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + JSON.parse(sessionStorage?.getItem('token') as string),
    }
    const httpResponse: any = this.http.get<any>(url, { headers });
    return httpResponse;
  }


  public helpSupport(fullname: string, email: string, reason: string, mobile: string): Observable<any> {
    const url: string = `${environment.apiUrl.ekSambandhUrl}/contact-us`;

    const httpResponse: any = this.http.post<any>(url, { fullname, email, reason, mobile });
    return httpResponse;
  }


  public profileUpdate(fullname: string, mobile: string): Observable<any> {
    const url: string = `${environment.apiUrl.ekSambandhUrl}/profile`;
    const headers = {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + JSON.parse(sessionStorage?.getItem('token') as string),
    }
    const httpResponse: any = this.http.patch<any>(url, { fullname, mobile }, { headers });
    return httpResponse;
  }


  public passwordUpdate(oldPassword: string, newPassword: string): Observable<any> {
    const url: string = `${environment.apiUrl.ekSambandhUrl}/change-password`;
    const headers = {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + JSON.parse(sessionStorage?.getItem('token') as string),
    }
    const httpResponse: any = this.http.post<any>(url, { oldPassword, newPassword }, { headers });
    return httpResponse;
  }



  public forgetPass(email: string): Observable<any> {
    const url: string = `${environment.apiUrl.ekSambandhUrl}/forgetPassword`;

    const httpResponse: any = this.http.post<any>(url, { email });
    return httpResponse;
  }

}
