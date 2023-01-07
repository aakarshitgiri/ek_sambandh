import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { ToastType } from 'src/app/models/notification-model';
import { UrlCollection } from 'src/app/models/urlcollection';
import { AdminEksambandhService } from 'src/app/services/admin-eksambandh.service';
import { NotificationService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: any;
  updateUserProfile: boolean = false;
  updateuser: boolean = false;
  profile: FormGroup;
  userupdate: FormGroup;
  updateSubmit: boolean = false;
  profileSubmit: boolean = false;
  userid: any;
  displayBasic: boolean = false;
  constructor(
    private primengConfig: PrimeNGConfig,
    private formBuilder: FormBuilder,
    private adminApi: AdminEksambandhService,
    private notificationservice: NotificationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.primengConfig.ripple = true;
    this.profile = this.formBuilder.group({
      fullname: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      repassword: new FormControl('', [Validators.required])
    });

    this.userupdate = this.formBuilder.group({
      fullname: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required]),
    });

  }

  viewPayment(id: string, name: string) {
    this.router.navigate([UrlCollection.adminpayments], { queryParams: { id: id, name: name } })
  }

  viewRelationship(id: string, name: string) {
    this.router.navigate([UrlCollection.adminrelationship], { queryParams: { id: id, name: name } })
  }


  async deleteUser() {
    this.notificationservice.showLoader();
    try {
      this.displayBasic = false;
      let res = await firstValueFrom(this.adminApi.deleteUser(this.userid));

      this.notificationservice.hideLoader();
      this.getUsers();
      this.notificationservice.showToast({ type: ToastType.Info, message: res.message });
    } catch (error: any) {
      this.notificationservice.hideLoader();
      this.notificationservice.showToast({ type: ToastType.Error, message: error.error.error });
    }
  }

  deleteModal(data: any) {
    this.displayBasic = true;
    this.userid = data._id;
  }

  checkpasswordMatch() {
    if (this.profile.controls['password'].value === this.profile.controls['repassword'].value) {
      return true;
    } else {
      return false;
    }
  }


  async getUsers() {
    this.notificationservice.showLoader();
    try {
      let response = await firstValueFrom(this.adminApi.getUsers());
      this.notificationservice.hideLoader()
      this.users = response.users;
    } catch (error: any) {
      this.notificationservice.hideLoader();
      this.notificationservice.showToast({ type: ToastType.Error, message: error.error.error });
    }
  }

  async addUser() {
    this.notificationservice.showLoader();
    this.profileSubmit = true;
    if (this.profile.valid) {
      try {
        this.updateUserProfile = false;
        let username = this.profile.value.fullname;
        let email = this.profile.value.email;
        let mobile = this.profile.value.mobile;
        let password = this.profile.value.password;

        let res = await firstValueFrom(this.adminApi.postUser(username, email, password, mobile));
        this.notificationservice.hideLoader();
        this.getUsers();
        this.notificationservice.showToast({ type: ToastType.Info, message: 'New user added successfully' });
      } catch (error: any) {
        this.notificationservice.hideLoader();
        this.notificationservice.showToast({ type: ToastType.Error, message: error.error.error });
      }
    } else {
      this.notificationservice.hideLoader();
      this.notificationservice.showToast({ type: ToastType.Error, message: "Please fill all required fields" });
    }

  }

  updateModel(data: any) {
    this.updateuser = true;
    this.userupdate.controls['fullname'].setValue(data.fullname);
    this.userupdate.controls['mobile'].setValue(data.mobile);
    this.userid = data._id;
  }



  async update() {
    this.notificationservice.showLoader();
    this.profileSubmit = true;
    if (this.userupdate.valid) {
      try {
        this.updateuser = false;
        let username = this.userupdate.value.fullname;
        let mobile = this.userupdate.value.mobile;

        await firstValueFrom(this.adminApi.updateUser(this.userid, username, mobile));


        this.notificationservice.hideLoader();
        this.getUsers();
        this.notificationservice.showToast({ type: ToastType.Info, message: 'User updated successfully' });
      } catch (error: any) {
        this.notificationservice.hideLoader();
        this.notificationservice.showToast({ type: ToastType.Error, message: error.error.error });
      }
    } else {
      this.notificationservice.hideLoader();
      this.notificationservice.showToast({ type: ToastType.Error, message: "Please fill all required fields" });
    }

  }


}
