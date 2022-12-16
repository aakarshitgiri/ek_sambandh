import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionsComponent } from './questions.component';
import { StepsModule } from 'primeng/steps';
import { RadioButtonModule } from 'primeng/radiobutton';
import { QuestionPart1Component } from './question-part1/question-part1.component';
import { QuestionPart2Component } from './question-part2/question-part2.component';
import { QuestionPart3Component } from './question-part3/question-part3.component';
import { QuestionPart4Component } from './question-part4/question-part4.component';
import { QuestionPart5Component } from './question-part5/question-part5.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    QuestionsComponent,
    QuestionPart1Component,
    QuestionPart2Component,
    QuestionPart3Component,
    QuestionPart4Component,
    QuestionPart5Component
  ],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    StepsModule,
    RadioButtonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class QuestionsModule { }
