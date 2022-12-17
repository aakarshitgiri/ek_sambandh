import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared-component/header/header.component';
import { FooterComponent } from './shared-component/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './modules/login/login.component';
import { SignupComponent } from './modules/signup/signup.component';
import { ForgotPasswordComponent } from './modules/forgot-password/forgot-password.component';
import { SetPasswordComponent } from './modules/set-password/set-password.component';
import { CheckboxModule } from 'primeng/checkbox';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ResultsComponent } from './modules/results/results.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { TransactionsComponent } from './modules/transactions/transactions.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WindowRef } from './services/windows-ref';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    SetPasswordComponent,
    DashboardComponent,
    ResultsComponent,
    ProfileComponent,
    TransactionsComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CheckboxModule,
    TableModule,
    PaginatorModule,
    DialogModule,
    ButtonModule,
    ToastModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    MessageService,
    WindowRef
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
