import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import questionpart2 from './questions-level-two.json'
import { DataStorageService } from 'src/app/services/data-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notifications.service';
import { UrlCollection } from 'src/app/models/urlcollection';
import { ToastType } from 'src/app/models/notification-model';
import { ApiEkSambandhService } from 'src/app/services/api-ek-sambandh.service';

@Component({
  selector: 'app-question-part2',
  templateUrl: './question-part2.component.html',
  styleUrls: ['./question-part2.component.scss']
})
export class QuestionPart2Component implements OnInit {

  questionsLevel2: any[] = questionpart2;
  questionsPart2: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private datastorge: DataStorageService,
    private router: Router,
    private notificationservice: NotificationService,
    private activateRouter: ActivatedRoute,
    private apiService: ApiEkSambandhService,
  ) { }

  ngOnInit() {
    this.questionsPart2 = this.formBuilder.group({
      questions11: new FormControl('', Validators.required),
      questions12: new FormControl('', Validators.required),
      questions13: new FormControl('', Validators.required),
      questions14: new FormControl('', Validators.required),
      questions15: new FormControl('', Validators.required),
      questions16: new FormControl('', Validators.required),
      questions17: new FormControl('', Validators.required),
      questions18: new FormControl('', Validators.required),
      questions19: new FormControl('', Validators.required),
      questions20: new FormControl('', Validators.required),
    });

    let id = this.activateRouter.snapshot.queryParams['id'];
    let mode = this.activateRouter.snapshot.queryParams['mode'];
    if (mode) {
      this.notificationservice.showLoader();
      this.apiService.getAnswers(id).subscribe((res: any) => {
        this.previewMode(res.results)
      })
    }

    this.randomizeAnswer();
    this.setPrevValue()
  }

  previewMode(res: any) {
    if (res?.length > 0) {
      for (let question of res) {
        if (question.questionId === 'question11') {
          this.questionsPart2.controls['questions11'].setValue(question.answer);
        } else if (question.questionId === 'question12') {
          this.questionsPart2.controls['questions12'].setValue(question.answer);
        } else if (question.questionId === 'question13') {
          this.questionsPart2.controls['questions13'].setValue(question.answer);
        } else if (question.questionId === 'question14') {
          this.questionsPart2.controls['questions14'].setValue(question.answer);
        } else if (question.questionId === 'question15') {
          this.questionsPart2.controls['questions15'].setValue(question.answer);
        } else if (question.questionId === 'question16') {
          this.questionsPart2.controls['questions16'].setValue(question.answer);
        } else if (question.questionId === 'question17') {
          this.questionsPart2.controls['questions17'].setValue(question.answer);
        } else if (question.questionId === 'question18') {
          this.questionsPart2.controls['questions18'].setValue(question.answer);
        } else if (question.questionId === 'question19') {
          this.questionsPart2.controls['questions19'].setValue(question.answer);
        } else if (question.questionId === 'question20') {
          this.questionsPart2.controls['questions20'].setValue(question.answer);
        }
      }

      this.questionsPart2.disable()
    }
    this.notificationservice.hideLoader();
  }

  setPrevValue() {
    let level2 = sessionStorage.getItem('level2')
    if (level2) {
      let newlevel2: any[] = JSON.parse(level2);
      if (newlevel2?.length > 0) {
        for (let question of newlevel2) {
          if (question.questionId === 'question11') {
            this.questionsPart2.controls['questions11'].setValue(question.answer);
          } else if (question.questionId === 'question12') {
            this.questionsPart2.controls['questions12'].setValue(question.answer);
          } else if (question.questionId === 'question13') {
            this.questionsPart2.controls['questions13'].setValue(question.answer);
          } else if (question.questionId === 'question14') {
            this.questionsPart2.controls['questions14'].setValue(question.answer);
          } else if (question.questionId === 'question15') {
            this.questionsPart2.controls['questions15'].setValue(question.answer);
          } else if (question.questionId === 'question16') {
            this.questionsPart2.controls['questions16'].setValue(question.answer);
          } else if (question.questionId === 'question17') {
            this.questionsPart2.controls['questions17'].setValue(question.answer);
          } else if (question.questionId === 'question18') {
            this.questionsPart2.controls['questions18'].setValue(question.answer);
          } else if (question.questionId === 'question19') {
            this.questionsPart2.controls['questions19'].setValue(question.answer);
          } else if (question.questionId === 'question20') {
            this.questionsPart2.controls['questions20'].setValue(question.answer);
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
    for (let questions of this.questionsLevel2) {
      this.shuffle(questions.options)
    }
  }

  submitForm2() {
    let mode = this.activateRouter.snapshot.queryParams['mode'];
    if (this.questionsPart2.valid && !mode) {
      this.notificationservice.showLoader()
      let level2 = [
        {
          questionId: "question11",
          answer: this.questionsPart2.value.questions11
        },
        {
          questionId: "question12",
          answer: this.questionsPart2.value.questions12
        },
        {
          questionId: "question13",
          answer: this.questionsPart2.value.questions13
        },
        {
          questionId: "question14",
          answer: this.questionsPart2.value.questions14
        },
        {
          questionId: "question15",
          answer: this.questionsPart2.value.questions15
        },
        {
          questionId: "question16",
          answer: this.questionsPart2.value.questions16
        },
        {
          questionId: "question17",
          answer: this.questionsPart2.value.questions17
        },
        {
          questionId: "question18",
          answer: this.questionsPart2.value.questions18
        },
        {
          questionId: "question19",
          answer: this.questionsPart2.value.questions19
        },
        {
          questionId: "question20",
          answer: this.questionsPart2.value.questions20
        },
      ];
      this.datastorge.setQuestionLevelTwo(level2);
      let relationshipId = this.activateRouter.snapshot.queryParams['id'];
      this.router.navigate([UrlCollection.Level3], { queryParams: { id: relationshipId } });
      this.notificationservice.hideLoader();
    } else if (mode) {
      let relationshipId = this.activateRouter.snapshot.queryParams['id'];
      this.router.navigate([UrlCollection.Level3], { queryParams: { id: relationshipId, mode: mode } });
    } else {
      this.notificationservice.showToast({ type: ToastType.Error, message: "Please answer all questions" });
    }
  }

  back() {
    let mode = this.activateRouter.snapshot.queryParams['mode'];
    let relationshipId = this.activateRouter.snapshot.queryParams['id'];
    if (mode) {
      this.router.navigate([UrlCollection.Level1], { queryParams: { id: relationshipId, mode: mode } });
    } else {
      this.router.navigate([UrlCollection.Level1], { queryParams: { id: relationshipId } });
    }


  }

}
