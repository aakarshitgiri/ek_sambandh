import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionPart1Component } from './question-part1/question-part1.component';
import { QuestionPart2Component } from './question-part2/question-part2.component';
import { QuestionPart3Component } from './question-part3/question-part3.component';
import { QuestionPart4Component } from './question-part4/question-part4.component';
import { QuestionsComponent } from './questions.component';
import { AuthService } from 'src/app/auth/auth.service';

const routes: Routes = [
  {
    path: '',
    component: QuestionsComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'level-1'
      },
      {
        path: 'level-1',
        component: QuestionPart1Component,
        canActivate: [AuthService]
      },
      {
        path: 'level-2',
        component: QuestionPart2Component,
        canActivate: [AuthService]
      },
      {
        path: 'level-3',
        component: QuestionPart3Component,
        canActivate: [AuthService]
      },
      {
        path: 'level-4',
        component: QuestionPart4Component,
        canActivate: [AuthService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionsRoutingModule { }
