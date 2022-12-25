import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import questionpart3 from './questions-level-three.json'
import { DataStorageService } from 'src/app/services/data-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notifications.service';
import { UrlCollection } from 'src/app/models/urlcollection';
import { ToastType } from 'src/app/models/notification-model';
import { ApiEkSambandhService } from 'src/app/services/api-ek-sambandh.service';

@Component({
  selector: 'app-question-part3',
  templateUrl: './question-part3.component.html',
  styleUrls: ['./question-part3.component.scss']
})
export class QuestionPart3Component implements OnInit {

  questionsLevel3: any[] = questionpart3;
  questionsPart3: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private datastorge: DataStorageService,
    private router: Router,
    private notificationservice: NotificationService,
    private activateRouter: ActivatedRoute,
    private apiService: ApiEkSambandhService,
  ) { }

  ngOnInit() {
    this.questionsPart3 = this.formBuilder.group({
      questions21: new FormControl('', Validators.required),
      questions22: new FormControl('', Validators.required),
      questions23: new FormControl('', Validators.required),
      questions24: new FormControl('', Validators.required),
      questions25: new FormControl('', Validators.required),
      questions26: new FormControl('', Validators.required),
      questions27: new FormControl('', Validators.required),
      questions28: new FormControl('', Validators.required),
      questions29: new FormControl('', Validators.required),
      questions30: new FormControl('', Validators.required),
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
        if (question.questionId === 'question21') {
          this.questionsPart3.controls['questions21'].setValue(question.answer);
        } else if (question.questionId === 'question22') {
          this.questionsPart3.controls['questions22'].setValue(question.answer);
        } else if (question.questionId === 'question23') {
          this.questionsPart3.controls['questions23'].setValue(question.answer);
        } else if (question.questionId === 'question24') {
          this.questionsPart3.controls['questions24'].setValue(question.answer);
        } else if (question.questionId === 'question25') {
          this.questionsPart3.controls['questions25'].setValue(question.answer);
        } else if (question.questionId === 'question26') {
          this.questionsPart3.controls['questions26'].setValue(question.answer);
        } else if (question.questionId === 'question27') {
          this.questionsPart3.controls['questions27'].setValue(question.answer);
        } else if (question.questionId === 'question28') {
          this.questionsPart3.controls['questions28'].setValue(question.answer);
        } else if (question.questionId === 'question29') {
          this.questionsPart3.controls['questions29'].setValue(question.answer);
        } else if (question.questionId === 'question30') {
          this.questionsPart3.controls['questions30'].setValue(question.answer);
        }
      }
      this.questionsPart3.disable()
    }
    this.notificationservice.hideLoader();
  }

  setPrevValue() {
    let level3 = sessionStorage.getItem('level3')
    if (level3) {
      let newlevel3: any[] = JSON.parse(level3);
      if (newlevel3?.length > 0) {
        for (let question of newlevel3) {
          if (question.questionId === 'question21') {
            this.questionsPart3.controls['questions21'].setValue(question.answer);
          } else if (question.questionId === 'question22') {
            this.questionsPart3.controls['questions22'].setValue(question.answer);
          } else if (question.questionId === 'question23') {
            this.questionsPart3.controls['questions23'].setValue(question.answer);
          } else if (question.questionId === 'question24') {
            this.questionsPart3.controls['questions24'].setValue(question.answer);
          } else if (question.questionId === 'question25') {
            this.questionsPart3.controls['questions25'].setValue(question.answer);
          } else if (question.questionId === 'question26') {
            this.questionsPart3.controls['questions26'].setValue(question.answer);
          } else if (question.questionId === 'question27') {
            this.questionsPart3.controls['questions27'].setValue(question.answer);
          } else if (question.questionId === 'question28') {
            this.questionsPart3.controls['questions28'].setValue(question.answer);
          } else if (question.questionId === 'question29') {
            this.questionsPart3.controls['questions29'].setValue(question.answer);
          } else if (question.questionId === 'question30') {
            this.questionsPart3.controls['questions30'].setValue(question.answer);
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
    for (let questions of this.questionsLevel3) {
      this.shuffle(questions.options)
    }
  }

  submitForm3() {
    let mode = this.activateRouter.snapshot.queryParams['mode'];
    if (this.questionsPart3.valid && !mode) {
      this.notificationservice.showLoader()
      let level3 = [
        {
          questionId: "question21",
          answer: this.questionsPart3.value.questions21
        },
        {
          questionId: "question22",
          answer: this.questionsPart3.value.questions22
        },
        {
          questionId: "question23",
          answer: this.questionsPart3.value.questions23
        },
        {
          questionId: "question24",
          answer: this.questionsPart3.value.questions24
        },
        {
          questionId: "question25",
          answer: this.questionsPart3.value.questions25
        },
        {
          questionId: "question26",
          answer: this.questionsPart3.value.questions26
        },
        {
          questionId: "question27",
          answer: this.questionsPart3.value.questions27
        },
        {
          questionId: "question28",
          answer: this.questionsPart3.value.questions28
        },
        {
          questionId: "question29",
          answer: this.questionsPart3.value.questions29
        },
        {
          questionId: "question30",
          answer: this.questionsPart3.value.questions30
        },
      ];
      let relationshipId = this.activateRouter.snapshot.queryParams['id'];
      this.datastorge.setQuestionLevelThree(level3);
      this.router.navigate([UrlCollection.Level4], { queryParams: { id: relationshipId } });
      this.notificationservice.hideLoader();
    } else if (mode) {
      let relationshipId = this.activateRouter.snapshot.queryParams['id'];
      this.router.navigate([UrlCollection.Level4], { queryParams: { id: relationshipId, mode: mode } });
    } else {
      this.notificationservice.showToast({ type: ToastType.Error, message: "Please answer all questions" });
    }
  }


  back() {
    let mode = this.activateRouter.snapshot.queryParams['mode'];
    let relationshipId = this.activateRouter.snapshot.queryParams['id'];
    if (mode) {
      this.router.navigate([UrlCollection.Level2], { queryParams: { id: relationshipId, mode: mode } });
    } else {
      this.router.navigate([UrlCollection.Level2], { queryParams: { id: relationshipId } });
    }
  }

}
