import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { PaymentsComponent } from './payments/payments.component';
import { RelationshipsComponent } from './relationships/relationships.component';
import { ContactsComponent } from './contacts/contacts.component';


@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    PaymentsComponent,
    RelationshipsComponent,
    ContactsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
