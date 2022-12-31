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
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  /*  {
     path: "admin",
     loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
   }, */
  {
    path: UrlCollectionName.Login,
    component: LoginComponent
  },
  {
    path: UrlCollectionName.Dashboard,
    component: DashboardComponent,
    canActivate: [AuthService]
  },
  {
    path: UrlCollectionName.relationshipAccept,
    component: RelationshipSuccessComponent
  },
  {
    path: UrlCollectionName.Result,
    component: ResultsComponent,
    canActivate: [AuthService]
  },
  {
    path: UrlCollectionName.LoveTest,
    loadChildren: () => import('./modules/questions/questions.module').then(m => m.QuestionsModule),
    canActivate: [AuthService]
  },
  {
    path: UrlCollectionName.Profile,
    component: ProfileComponent,
    canActivate: [AuthService]
  },
  {
    path: UrlCollectionName.Payments,
    component: TransactionsComponent,
    canActivate: [AuthService]
  },
  {
    path: UrlCollectionName.SignUp,
    component: SignupComponent
  },
  {
    path: UrlCollectionName.SetPass,
    component: SetPasswordComponent
  },
  {
    path: UrlCollectionName.ForgotPass,
    component: ForgotPasswordComponent
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
