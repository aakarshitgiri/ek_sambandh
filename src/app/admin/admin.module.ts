import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { PaymentsComponent } from './payments/payments.component';
import { RelationshipsComponent } from './relationships/relationships.component';
import { ContactsComponent } from './contacts/contacts.component';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ViewAnswersComponent } from './view-answers/view-answers.component';
import { RadioButtonModule } from 'primeng/radiobutton';


@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    PaymentsComponent,
    RelationshipsComponent,
    ContactsComponent,
    ViewAnswersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    TableModule,
    TabViewModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    RadioButtonModule
  ],
  providers: [
    MessageService,
  ]
})
export class AdminModule { }
