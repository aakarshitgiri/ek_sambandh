import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataStorageService } from './data-storage.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminEksambandhService {

  constructor(
    private http: HttpClient,
    private dataStorge: DataStorageService
  ) { }

  public adminlogin(email: string, password: string): Observable<any> {
    const url: string = `${environment.apiUrl.ekSambandhUrl}/admin/login`;

    const httpResponse: any = this.http.post<any>(url, { email, password });
    return httpResponse;
  }

  public getDashboardData(): Observable<any> {
    const url: string = `${environment.apiUrl.ekSambandhUrl}/admin/dashboard`;
    const headers = {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + JSON.parse(sessionStorage?.getItem('token') as string),
    }
    const httpResponse: any = this.http.get<any>(url, { headers });
    return httpResponse;
  }

  public getUsers(): Observable<any> {
    const url: string = `${environment.apiUrl.ekSambandhUrl}/admin/user/viewAll`;
    const headers = {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + JSON.parse(sessionStorage?.getItem('token') as string),
    }
    const httpResponse: any = this.http.get<any>(url, { headers });
    return httpResponse;
  }

  public getPayments(): Observable<any> {
    const url: string = `${environment.apiUrl.ekSambandhUrl}/admin/payments`;
    const headers = {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + JSON.parse(sessionStorage?.getItem('token') as string),
    }
    const httpResponse: any = this.http.get<any>(url, { headers });
    return httpResponse;
  }

  public getRelationships(): Observable<any> {
    const url: string = `${environment.apiUrl.ekSambandhUrl}/admin/relationships`;
    const headers = {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + JSON.parse(sessionStorage?.getItem('token') as string),
    }
    const httpResponse: any = this.http.get<any>(url, { headers });
    return httpResponse;
  }

  public getResults(relationshipId: string): Observable<any> {
    const url: string = `${environment.apiUrl.ekSambandhUrl}/admin/relationship/result/${relationshipId}`;
    const headers = {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + JSON.parse(sessionStorage?.getItem('token') as string),
    }
    const httpResponse: any = this.http.get<any>(url, { headers });
    return httpResponse;
  }

  public getAnswers(relationshipId: string): Observable<any> {
    const url: string = `${environment.apiUrl.ekSambandhUrl}/admin/relationship/${relationshipId}`;
    const headers = {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + JSON.parse(sessionStorage?.getItem('token') as string),
    }
    const httpResponse: any = this.http.get<any>(url, { headers });
    return httpResponse;
  }

  public postUser(fullname: string, email: string, password: string, mobile: string): Observable<any> {
    const url: string = `${environment.apiUrl.ekSambandhUrl}/admin/user/signup`;
    const headers = {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + JSON.parse(sessionStorage?.getItem('token') as string),
    }
    const httpResponse: any = this.http.post<any>(url, { fullname, email, password, mobile }, { headers });
    return httpResponse;
  }

  public updateUser(userid: string, fullname: string, mobile: string): Observable<any> {
    const url: string = `${environment.apiUrl.ekSambandhUrl}/admin/user/update/${userid}`;
    const headers = {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + JSON.parse(sessionStorage?.getItem('token') as string),
    }

    const httpResponse: any = this.http.patch<any>(url, { fullname, mobile }, { headers });
    return httpResponse;
  }

  public getContacts(): Observable<any> {
    const url: string = `${environment.apiUrl.ekSambandhUrl}/admin/contacts`;
    const headers = {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + JSON.parse(sessionStorage?.getItem('token') as string),
    }
    const httpResponse: any = this.http.get<any>(url, { headers });
    return httpResponse;
  }

  public deleteRelationship(id: string): Observable<any> {
    const url: string = `${environment.apiUrl.ekSambandhUrl}/admin/relationship/delete/${id}`;
    const headers = {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + JSON.parse(sessionStorage?.getItem('token') as string),
    }
    const httpResponse: any = this.http.delete<any>(url, { headers });
    return httpResponse;
  }

  public deleteUser(id: string): Observable<any> {
    const url: string = `${environment.apiUrl.ekSambandhUrl}/admin/user/delete/${id}`;
    const headers = {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + JSON.parse(sessionStorage?.getItem('token') as string),
    }
    const httpResponse: any = this.http.delete<any>(url, { headers });
    return httpResponse;
  }

}
