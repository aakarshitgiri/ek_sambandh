import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionPart1Component } from './question-part1/question-part1.component';
import { QuestionPart2Component } from './question-part2/question-part2.component';
import { QuestionPart3Component } from './question-part3/question-part3.component';
import { QuestionPart4Component } from './question-part4/question-part4.component';
import { QuestionPart5Component } from './question-part5/question-part5.component';
import { QuestionsComponent } from './questions.component';

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
        component: QuestionPart1Component
      },
      {
        path: 'level-2',
        component: QuestionPart2Component
      },
      {
        path: 'level-3',
        component: QuestionPart3Component
      },
      {
        path: 'level-4',
        component: QuestionPart4Component
      },
      /*  {
         path: 'level-5',
         component: QuestionPart5Component
       } */
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionsRoutingModule { }
