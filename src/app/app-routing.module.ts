import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { UrlCollectionName } from './models/urlcollection';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './modules/forgot-password/forgot-password.component';
import { HomeComponent } from './modules/home/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { ResultsComponent } from './modules/results/results.component';
import { SetPasswordComponent } from './modules/set-password/set-password.component';
import { SignupComponent } from './modules/signup/signup.component';
import { TransactionsComponent } from './modules/transactions/transactions.component';
import { RelationshipSuccessComponent } from './modules/relationship-success/relationship-success.component';
import { AuthService } from './auth/auth.service';
import { AdminloginComponent } from './modules/adminlogin/adminlogin.component';
import { AdminAuthService } from './auth/admin-auth.service';
import { NonAdminRouteService } from './auth/non-admin-route.service';
import { DocsComponent } from './modules/docs/docs.component';
const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
};


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: UrlCollectionName.Home,
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    canActivate: [NonAdminRouteService]
  },
  {
    path: UrlCollectionName.admin,
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthService, AdminAuthService]
  },
  {
    path: UrlCollectionName.Login,
    component: LoginComponent,
    canActivate: [NonAdminRouteService]
  },
  {
    path: UrlCollectionName.adminlogin,
    component: AdminloginComponent,
    canActivate: [NonAdminRouteService]
  },
  {
    path: UrlCollectionName.Dashboard,
    component: DashboardComponent,
    canActivate: [AuthService, NonAdminRouteService]
  },
  {
    path: UrlCollectionName.relationshipAccept,
    component: RelationshipSuccessComponent,
    canActivate: [NonAdminRouteService]
  },
  {
    path: UrlCollectionName.Result,
    component: ResultsComponent,
    canActivate: [AuthService]
  },
  {
    path: UrlCollectionName.LoveTest,
    loadChildren: () => import('./modules/questions/questions.module').then(m => m.QuestionsModule),
    canActivate: [AuthService, NonAdminRouteService]
  },
  {
    path: UrlCollectionName.Profile,
    component: ProfileComponent,
    canActivate: [AuthService, NonAdminRouteService]
  },
  {
    path: UrlCollectionName.Payments,
    component: TransactionsComponent,
    canActivate: [AuthService, NonAdminRouteService]
  },
  {
    path: UrlCollectionName.SignUp,
    component: SignupComponent,
    canActivate: [NonAdminRouteService]
  },
  {
    path: UrlCollectionName.SetPass,
    component: SetPasswordComponent,
    canActivate: [NonAdminRouteService]
  },
  {
    path: UrlCollectionName.ForgotPass,
    component: ForgotPasswordComponent,
    canActivate: [NonAdminRouteService]
  },
  {
    path: UrlCollectionName.termsCondition,
    component: DocsComponent
  },
  {
    path: UrlCollectionName.privacyPolicy,
    component: DocsComponent
  },
  {
    path: UrlCollectionName.refundPolicy,
    component: DocsComponent
  },
  {
    path: '**',
    redirectTo: UrlCollectionName.Home
  },


];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
