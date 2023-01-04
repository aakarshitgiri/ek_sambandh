import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import html2canvas from 'html2canvas';
import { ToastType } from 'src/app/models/notification-model';
import { UrlCollection } from 'src/app/models/urlcollection';
import { AdminEksambandhService } from 'src/app/services/admin-eksambandh.service';
import { ApiEkSambandhService } from 'src/app/services/api-ek-sambandh.service';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { NotificationService } from 'src/app/services/notifications.service';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],

})
export class ResultsComponent implements OnInit {
  @ViewChild('results', { static: false }) results: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;
  apiResult: any;
  user: string;
  partner: string;
  id: string;
  showValue: boolean = false;
  isAdmin: boolean = false;
  constructor(
    private datastorge: DataStorageService,
    private adminApi: AdminEksambandhService,
    private router: Router,
    private apiService: ApiEkSambandhService,
    private notificationservice: NotificationService,
    private ActivateRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.id = this.ActivateRoute.snapshot.queryParams['id'];
    this.user = this.ActivateRoute.snapshot.queryParams['user'];
    this.partner = this.ActivateRoute.snapshot.queryParams['partner'];
    let view = this.ActivateRoute.snapshot.queryParams['view'];

    if (!this.id) {
      this.router.navigate([UrlCollection.Dashboard])
    } else if (view === 'admin') {
      this.isAdmin = true;
      this.getAdminResult();
    } else {
      this.getResult();
    }

  }

  getResult() {
    this.notificationservice.showLoader()
    try {
      this.apiService.getResults(this.id).subscribe((res: any) => {
        this.apiResult = res.results;
        this.showValue = true;
        this.notificationservice.hideLoader()
      })
    } catch (error: any) {
      this.notificationservice.hideLoader();
      this.notificationservice.showToast({ type: ToastType.Error, message: error.error.error });
    }

  }

  getAdminResult() {
    this.notificationservice.showLoader()
    try {
      this.adminApi.getResults(this.id).subscribe((res: any) => {
        this.apiResult = res.results;
        this.showValue = true;
        this.notificationservice.hideLoader()
      })
    } catch (error: any) {
      this.notificationservice.hideLoader();
      this.notificationservice.showToast({ type: ToastType.Error, message: error.error.error });
    }

  }


  downloadResult() {
    html2canvas(this.results.nativeElement).then(canvas => {
      this.canvas.nativeElement.src = canvas.toDataURL();
      this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLink.nativeElement.download = 'ek-sambandh-result.png';
      this.downloadLink.nativeElement.click();
    });
  }

  makeAbsolute(value: string) {
    return parseFloat(value);
  }

  goToAnswers() {
    this.router.navigate([UrlCollection.Level1], { queryParams: { id: this.id, mode: 'view' } })
  }

}
