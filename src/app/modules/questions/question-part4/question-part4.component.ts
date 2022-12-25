import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import questionpart4 from './questions-level-four.json'
import { DataStorageService } from 'src/app/services/data-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notifications.service';
import { ToastType } from 'src/app/models/notification-model';
import { ApiEkSambandhService } from 'src/app/services/api-ek-sambandh.service';
import { UrlCollection } from 'src/app/models/urlcollection';

@Component({
  selector: 'app-question-part4',
  templateUrl: './question-part4.component.html',
  styleUrls: ['./question-part4.component.scss']
})
export class QuestionPart4Component implements OnInit {
  questionsLevel4: any[] = questionpart4;
  questionsPart4: FormGroup;
  isDisable: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private datastorge: DataStorageService,
    private router: Router,
    private notificationservice: NotificationService,
    private activateRouter: ActivatedRoute,
    private apiService: ApiEkSambandhService,
  ) { }
  ngOnInit() {
    this.questionsPart4 = this.formBuilder.group({
      questions31: new FormControl('', Validators.required),
      questions32: new FormControl('', Validators.required),
      questions33: new FormControl('', Validators.required),
      questions34: new FormControl('', Validators.required),
      questions35: new FormControl('', Validators.required),
      questions36: new FormControl('', Validators.required),
      questions37: new FormControl('', Validators.required),
      questions38: new FormControl('', Validators.required),
      questions39: new FormControl('', Validators.required),
      questions40: new FormControl('', Validators.required),
      questions41: new FormControl('', Validators.required),
      questions42: new FormControl('', Validators.required)
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
        if (question.questionId === 'question31') {
          this.questionsPart4.controls['questions31'].setValue(question.answer);
        } else if (question.questionId === 'question32') {
          this.questionsPart4.controls['questions32'].setValue(question.answer);
        } else if (question.questionId === 'question33') {
          this.questionsPart4.controls['questions33'].setValue(question.answer);
        } else if (question.questionId === 'question34') {
          this.questionsPart4.controls['questions34'].setValue(question.answer);
        } else if (question.questionId === 'question35') {
          this.questionsPart4.controls['questions35'].setValue(question.answer);
        } else if (question.questionId === 'question36') {
          this.questionsPart4.controls['questions36'].setValue(question.answer);
        } else if (question.questionId === 'question37') {
          this.questionsPart4.controls['questions37'].setValue(question.answer);
        } else if (question.questionId === 'question38') {
          this.questionsPart4.controls['questions38'].setValue(question.answer);
        } else if (question.questionId === 'question39') {
          this.questionsPart4.controls['questions39'].setValue(question.answer);
        } else if (question.questionId === 'question40') {
          this.questionsPart4.controls['questions40'].setValue(question.answer);
        } else if (question.questionId === 'question41') {
          this.questionsPart4.controls['questions41'].setValue(question.answer);
        } else if (question.questionId === 'question42') {
          this.questionsPart4.controls['questions42'].setValue(question.answer);
        }
      }
      this.questionsPart4.disable();
      this.isDisable = true;
    }
    this.notificationservice.hideLoader();
  }

  setPrevValue() {
    let level4 = sessionStorage.getItem('level4')
    if (level4) {
      let newlevel4: any[] = JSON.parse(level4);
      if (newlevel4?.length > 0) {
        for (let question of newlevel4) {
          if (question.questionId === 'question31') {
            this.questionsPart4.controls['questions31'].setValue(question.answer);
          } else if (question.questionId === 'question32') {
            this.questionsPart4.controls['questions32'].setValue(question.answer);
          } else if (question.questionId === 'question33') {
            this.questionsPart4.controls['questions33'].setValue(question.answer);
          } else if (question.questionId === 'question34') {
            this.questionsPart4.controls['questions34'].setValue(question.answer);
          } else if (question.questionId === 'question35') {
            this.questionsPart4.controls['questions35'].setValue(question.answer);
          } else if (question.questionId === 'question36') {
            this.questionsPart4.controls['questions36'].setValue(question.answer);
          } else if (question.questionId === 'question37') {
            this.questionsPart4.controls['questions37'].setValue(question.answer);
          } else if (question.questionId === 'question38') {
            this.questionsPart4.controls['questions38'].setValue(question.answer);
          } else if (question.questionId === 'question39') {
            this.questionsPart4.controls['questions39'].setValue(question.answer);
          } else if (question.questionId === 'question40') {
            this.questionsPart4.controls['questions40'].setValue(question.answer);
          } else if (question.questionId === 'question41') {
            this.questionsPart4.controls['questions41'].setValue(question.answer);
          } else if (question.questionId === 'question42') {
            this.questionsPart4.controls['questions42'].setValue(question.answer);
          }
        }
      }


    }

  }

  save() {
    if (this.questionsPart4.valid) {
      let level4 = [
        {
          questionId: "question31",
          answer: this.questionsPart4.value.questions31
        },
        {
          questionId: "question32",
          answer: this.questionsPart4.value.questions32
        },
        {
          questionId: "question33",
          answer: this.questionsPart4.value.questions33
        },
        {
          questionId: "question34",
          answer: this.questionsPart4.value.questions34
        },
        {
          questionId: "question35",
          answer: this.questionsPart4.value.questions35
        },
        {
          questionId: "question36",
          answer: this.questionsPart4.value.questions36
        },
        {
          questionId: "question37",
          answer: this.questionsPart4.value.questions37
        },
        {
          questionId: "question38",
          answer: this.questionsPart4.value.questions38
        },
        {
          questionId: "question39",
          answer: this.questionsPart4.value.questions39
        },
        {
          questionId: "question40",
          answer: this.questionsPart4.value.questions40
        },
        {
          questionId: "question41",
          answer: this.questionsPart4.value.questions41
        },
        {
          questionId: "question42",
          answer: this.questionsPart4.value.questions42
        },
      ];
      this.datastorge.setQuestionLevelFour(level4);
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
    for (let questions of this.questionsLevel4) {
      this.shuffle(questions.options)
    }
  }


  submitForm4() {
    if (this.questionsPart4.valid) {
      this.notificationservice.showLoader()
      let level4 = [
        {
          questionId: "question31",
          answer: this.questionsPart4.value.questions31
        },
        {
          questionId: "question32",
          answer: this.questionsPart4.value.questions32
        },
        {
          questionId: "question33",
          answer: this.questionsPart4.value.questions33
        },
        {
          questionId: "question34",
          answer: this.questionsPart4.value.questions34
        },
        {
          questionId: "question35",
          answer: this.questionsPart4.value.questions35
        },
        {
          questionId: "question36",
          answer: this.questionsPart4.value.questions36
        },
        {
          questionId: "question37",
          answer: this.questionsPart4.value.questions37
        },
        {
          questionId: "question38",
          answer: this.questionsPart4.value.questions38
        },
        {
          questionId: "question39",
          answer: this.questionsPart4.value.questions39
        },
        {
          questionId: "question40",
          answer: this.questionsPart4.value.questions40
        },
        {
          questionId: "question41",
          answer: this.questionsPart4.value.questions41
        },
        {
          questionId: "question42",
          answer: this.questionsPart4.value.questions42
        },
      ];
      this.datastorge.setQuestionLevelFour(level4);
      this.combileAll()

    } else {
      this.notificationservice.showToast({ type: ToastType.Error, message: "Please answer all questions" });
    }
  }

  combileAll() {
    let level1 = sessionStorage.getItem('level1')
    if (level1) {
      level1 = JSON.parse(level1);
    }
    let level2 = sessionStorage.getItem('level2')
    if (level2) {
      level2 = JSON.parse(level2);
    }
    let level3 = sessionStorage.getItem('level3')
    if (level3) {
      level3 = JSON.parse(level3);
    }
    let level4 = sessionStorage.getItem('level4')
    if (level4) {
      level4 = JSON.parse(level4);
    }
    if (level1 && level2 && level3 && level4) {
      let finalData = [...level1, ...level2, ...level3, ...level4];
      let relationshipId = this.activateRouter.snapshot.queryParams['id'];
      this.apiService.submitQuestions(finalData, relationshipId).subscribe((res: any) => {
        this.datastorge.setQuestionLevelOne([]);
        this.datastorge.setQuestionLevelTwo([]);
        this.datastorge.setQuestionLevelThree([]);
        this.datastorge.setQuestionLevelFour([]);
        this.notificationservice.hideLoader();
        this.notificationservice.showToast({ type: ToastType.Info, message: res.message });
        this.router.navigate([UrlCollection.Dashboard])
      })


    } else {
      this.notificationservice.hideLoader();
      this.notificationservice.showToast({ type: ToastType.Error, message: "Please answer all questions" });
    }


  }

  back() {
    let mode = this.activateRouter.snapshot.queryParams['mode'];
    let relationshipId = this.activateRouter.snapshot.queryParams['id'];
    if (mode) {
      this.router.navigate([UrlCollection.Level3], { queryParams: { id: relationshipId, mode: mode } });
    } else {
      this.router.navigate([UrlCollection.Level3], { queryParams: { id: relationshipId } });
    }
  }

}
