import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { PaymentsComponent } from './payments/payments.component';
import { RelationshipsComponent } from './relationships/relationships.component';
import { ContactsComponent } from './contacts/contacts.component';
import { UrlCollectionName } from '../models/urlcollection';
import { ViewAnswersComponent } from './view-answers/view-answers.component';
import { AdminAuthService } from '../auth/admin-auth.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DashboardComponent,
    canActivate: [AdminAuthService]
  },
  {
    path: UrlCollectionName.admindashboard,
    component: DashboardComponent,
    canActivate: [AdminAuthService]

  },
  {
    path: UrlCollectionName.adminusers,
    component: UsersComponent,
    canActivate: [AdminAuthService]
  },
  {
    path: UrlCollectionName.adminpayments,
    component: PaymentsComponent,
    canActivate: [AdminAuthService]
  },
  {
    path: UrlCollectionName.adminrelationship,
    component: RelationshipsComponent,
    canActivate: [AdminAuthService]
  },
  {
    path: UrlCollectionName.admincontactus,
    component: ContactsComponent,
    canActivate: [AdminAuthService]
  },
  {
    path: UrlCollectionName.adminviewanswer,
    component: ViewAnswersComponent,
    canActivate: [AdminAuthService]
  },
  {
    path: '**',
    redirectTo: UrlCollectionName.Dashboard
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
