import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { CreateAccount, IUser } from '../models/enums';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiEkSambandhService {

  constructor(
    private http: HttpClient,
  ) { }

  public createAccount(fullname: string, email: string, password: string, addPartner?: boolean, partnerEmail?: string, mobile?: string): Observable<any> {
    const url: string = `${environment.apiUrl.ekSambandhUrl}/signup`;

    const httpResponse: any = this.http.post<any>(url, { fullname, email, password, addPartner, partnerEmail, mobile, observe: 'response' });
    return httpResponse;
  }


  public verifyEmail(email: string): Observable<any> {
    const url: string = `${environment.apiUrl.ekSambandhUrl}/user/verificationRequest`;

    const httpResponse: any = this.http.post<any>(url, { email, observe: 'response' });
    return httpResponse;
  }

  public verifyOtp(email: string, otp: string): Observable<any> {
    const url: string = `${environment.apiUrl.ekSambandhUrl}/user/verifyOtp`;

    const httpResponse: any = this.http.post<any>(url, { email, otp, observe: 'response' });
    return httpResponse;
  }

  public login(obj: any): Observable<any> {
    const url: string = `${environment.apiUrl.ekSambandhUrl}/login`;

    const httpResponse: any = this.http.post<any>(url, { obj, observe: 'response' });
    return httpResponse;
  }

}
