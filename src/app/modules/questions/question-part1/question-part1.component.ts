import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import questionpart1 from './questions-level-one.json'
import { DataStorageService } from 'src/app/services/data-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlCollection } from 'src/app/models/urlcollection';
import { NotificationService } from 'src/app/services/notifications.service';
import { ToastType } from 'src/app/models/notification-model';
import { ApiEkSambandhService } from 'src/app/services/api-ek-sambandh.service';

@Component({
  selector: 'app-question-part1',
  templateUrl: './question-part1.component.html',
  styleUrls: ['./question-part1.component.scss']
})
export class QuestionPart1Component implements OnInit {

  questionsLevel1: any[] = questionpart1;
  questionsPart1: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private datastorge: DataStorageService,
    private router: Router,
    private notificationservice: NotificationService,
    private activateRouter: ActivatedRoute,
    private apiService: ApiEkSambandhService,
  ) { }

  ngOnInit() {



    this.questionsPart1 = this.formBuilder.group({
      questions1: new FormControl('', Validators.required),
      questions2: new FormControl('', Validators.required),
      questions3: new FormControl('', Validators.required),
      questions4: new FormControl('', Validators.required),
      questions5: new FormControl('', Validators.required),
      questions6: new FormControl('', Validators.required),
      questions7: new FormControl('', Validators.required),
      questions8: new FormControl('', Validators.required),
      questions9: new FormControl('', Validators.required),
      questions10: new FormControl('', Validators.required),
    });



    let id = this.activateRouter.snapshot.queryParams['id'];
    if (!id) {
      this.router.navigate([UrlCollection.Dashboard])
    } else {
      let mode = this.activateRouter.snapshot.queryParams['mode'];
      if (mode) {
        this.notificationservice.showLoader();
        this.apiService.getAnswers(id).subscribe((res: any) => {
          this.previewMode(res.results)
        })
      }




      this.randomizeAnswer();
      this.setPrevValue();
    }


  }

  previewMode(res: any) {
    if (res?.length > 0) {
      for (let question of res) {
        if (question.questionId === 'question1') {
          this.questionsPart1.controls['questions1'].setValue(question.answer);
        } else if (question.questionId === 'question2') {
          this.questionsPart1.controls['questions2'].setValue(question.answer);
        } else if (question.questionId === 'question3') {
          this.questionsPart1.controls['questions3'].setValue(question.answer);
        } else if (question.questionId === 'question4') {
          this.questionsPart1.controls['questions4'].setValue(question.answer);
        } else if (question.questionId === 'question5') {
          this.questionsPart1.controls['questions5'].setValue(question.answer);
        } else if (question.questionId === 'question6') {
          this.questionsPart1.controls['questions6'].setValue(question.answer);
        } else if (question.questionId === 'question7') {
          this.questionsPart1.controls['questions7'].setValue(question.answer);
        } else if (question.questionId === 'question8') {
          this.questionsPart1.controls['questions8'].setValue(question.answer);
        } else if (question.questionId === 'question9') {
          this.questionsPart1.controls['questions9'].setValue(question.answer);
        } else if (question.questionId === 'question10') {
          this.questionsPart1.controls['questions10'].setValue(question.answer);
        }
      }

      this.questionsPart1.disable()
    }
    this.notificationservice.hideLoader();
  }


  setPrevValue() {
    let level1 = sessionStorage.getItem('level1')
    if (level1) {
      let newlevel1: any[] = JSON.parse(level1);
      if (newlevel1?.length > 0) {
        for (let question of newlevel1) {
          if (question.questionId === 'question1') {
            this.questionsPart1.controls['questions1'].setValue(question.answer);
          } else if (question.questionId === 'question2') {
            this.questionsPart1.controls['questions2'].setValue(question.answer);
          } else if (question.questionId === 'question3') {
            this.questionsPart1.controls['questions3'].setValue(question.answer);
          } else if (question.questionId === 'question4') {
            this.questionsPart1.controls['questions4'].setValue(question.answer);
          } else if (question.questionId === 'question5') {
            this.questionsPart1.controls['questions5'].setValue(question.answer);
          } else if (question.questionId === 'question6') {
            this.questionsPart1.controls['questions6'].setValue(question.answer);
          } else if (question.questionId === 'question7') {
            this.questionsPart1.controls['questions7'].setValue(question.answer);
          } else if (question.questionId === 'question8') {
            this.questionsPart1.controls['questions8'].setValue(question.answer);
          } else if (question.questionId === 'question9') {
            this.questionsPart1.controls['questions9'].setValue(question.answer);
          } else if (question.questionId === 'question10') {
            this.questionsPart1.controls['questions10'].setValue(question.answer);
          }
        }
      }


    }

  }


  shuffle(array: any[]) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }


  randomizeAnswer() {
    for (let questions of this.questionsLevel1) {
      this.shuffle(questions.options)
    }
  }

  submitForm1() {
    let mode = this.activateRouter.snapshot.queryParams['mode'];
    if (this.questionsPart1.valid && !mode) {
      this.notificationservice.showLoader()
      let level1 = [
        {
          questionId: "question1",
          answer: this.questionsPart1.value.questions1
        },
        {
          questionId: "question2",
          answer: this.questionsPart1.value.questions2
        },
        {
          questionId: "question3",
          answer: this.questionsPart1.value.questions3
        },
        {
          questionId: "question4",
          answer: this.questionsPart1.value.questions4
        },
        {
          questionId: "question5",
          answer: this.questionsPart1.value.questions5
        },
        {
          questionId: "question6",
          answer: this.questionsPart1.value.questions6
        },
        {
          questionId: "question7",
          answer: this.questionsPart1.value.questions7
        },
        {
          questionId: "question8",
          answer: this.questionsPart1.value.questions8
        },
        {
          questionId: "question9",
          answer: this.questionsPart1.value.questions9
        },
        {
          questionId: "question10",
          answer: this.questionsPart1.value.questions10
        },
      ];
      this.datastorge.setQuestionLevelOne(level1);
      let relationshipId = this.activateRouter.snapshot.queryParams['id'];
      this.router.navigate([UrlCollection.Level2], { queryParams: { id: relationshipId } });
      this.notificationservice.hideLoader();
    } else if (mode) {
      let relationshipId = this.activateRouter.snapshot.queryParams['id'];
      this.router.navigate([UrlCollection.Level2], { queryParams: { id: relationshipId, mode: mode } });
    } else {
      this.notificationservice.showToast({ type: ToastType.Error, message: "Please answer all questions" });
    }

  }

}
