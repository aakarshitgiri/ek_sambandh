import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import questionpart1 from './questions-level-one.json'
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notifications.service';
import { AdminEksambandhService } from 'src/app/services/admin-eksambandh.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-view-answers',
  templateUrl: './view-answers.component.html',
  styleUrls: ['./view-answers.component.scss']
})
export class ViewAnswersComponent implements OnInit {
  questionsPart1: FormGroup;
  questionsPart2: FormGroup;
  questionsLevel1: any[] = questionpart1;
  answers: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private notificationservice: NotificationService,
    private activateRouter: ActivatedRoute,
    private adminApi: AdminEksambandhService,
  ) { }

  ngOnInit(): void {

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

    this.questionsPart2 = this.formBuilder.group({
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
    this.questionsPart1.disable()
    this.questionsPart2.disable()
    let id = this.activateRouter.snapshot.queryParams['id'];
    this.getAnswers(id);
  }


  requestingPartnerAnswer(res: any) {
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
        } else if (question.questionId === 'question11') {
          this.questionsPart1.controls['questions11'].setValue(question.answer);
        } else if (question.questionId === 'question12') {
          this.questionsPart1.controls['questions12'].setValue(question.answer);
        } else if (question.questionId === 'question13') {
          this.questionsPart1.controls['questions13'].setValue(question.answer);
        } else if (question.questionId === 'question14') {
          this.questionsPart1.controls['questions14'].setValue(question.answer);
        } else if (question.questionId === 'question15') {
          this.questionsPart1.controls['questions15'].setValue(question.answer);
        } else if (question.questionId === 'question16') {
          this.questionsPart1.controls['questions16'].setValue(question.answer);
        } else if (question.questionId === 'question17') {
          this.questionsPart1.controls['questions17'].setValue(question.answer);
        } else if (question.questionId === 'question18') {
          this.questionsPart1.controls['questions18'].setValue(question.answer);
        } else if (question.questionId === 'question19') {
          this.questionsPart1.controls['questions19'].setValue(question.answer);
        } else if (question.questionId === 'question20') {
          this.questionsPart1.controls['questions20'].setValue(question.answer);
        } else if (question.questionId === 'question21') {
          this.questionsPart1.controls['questions21'].setValue(question.answer);
        } else if (question.questionId === 'question22') {
          this.questionsPart1.controls['questions22'].setValue(question.answer);
        } else if (question.questionId === 'question23') {
          this.questionsPart1.controls['questions23'].setValue(question.answer);
        } else if (question.questionId === 'question24') {
          this.questionsPart1.controls['questions24'].setValue(question.answer);
        } else if (question.questionId === 'question25') {
          this.questionsPart1.controls['questions25'].setValue(question.answer);
        } else if (question.questionId === 'question26') {
          this.questionsPart1.controls['questions26'].setValue(question.answer);
        } else if (question.questionId === 'question27') {
          this.questionsPart1.controls['questions27'].setValue(question.answer);
        } else if (question.questionId === 'question28') {
          this.questionsPart1.controls['questions28'].setValue(question.answer);
        } else if (question.questionId === 'question29') {
          this.questionsPart1.controls['questions29'].setValue(question.answer);
        } else if (question.questionId === 'question30') {
          this.questionsPart1.controls['questions30'].setValue(question.answer);
        } else if (question.questionId === 'question31') {
          this.questionsPart1.controls['questions31'].setValue(question.answer);
        } else if (question.questionId === 'question32') {
          this.questionsPart1.controls['questions32'].setValue(question.answer);
        } else if (question.questionId === 'question33') {
          this.questionsPart1.controls['questions33'].setValue(question.answer);
        } else if (question.questionId === 'question34') {
          this.questionsPart1.controls['questions34'].setValue(question.answer);
        } else if (question.questionId === 'question35') {
          this.questionsPart1.controls['questions35'].setValue(question.answer);
        } else if (question.questionId === 'question36') {
          this.questionsPart1.controls['questions36'].setValue(question.answer);
        } else if (question.questionId === 'question37') {
          this.questionsPart1.controls['questions37'].setValue(question.answer);
        } else if (question.questionId === 'question38') {
          this.questionsPart1.controls['questions38'].setValue(question.answer);
        } else if (question.questionId === 'question39') {
          this.questionsPart1.controls['questions39'].setValue(question.answer);
        } else if (question.questionId === 'question40') {
          this.questionsPart1.controls['questions40'].setValue(question.answer);
        } else if (question.questionId === 'question41') {
          this.questionsPart1.controls['questions41'].setValue(question.answer);
        } else if (question.questionId === 'question42') {
          this.questionsPart1.controls['questions42'].setValue(question.answer);
        }
      }


    }
    this.notificationservice.hideLoader();
  }


  requestedPartnerAnswer(res: any) {
    if (res?.length > 0) {
      for (let question of res) {
        if (question.questionId === 'question1') {
          this.questionsPart2.controls['questions1'].setValue(question.answer);
        } else if (question.questionId === 'question2') {
          this.questionsPart2.controls['questions2'].setValue(question.answer);
        } else if (question.questionId === 'question3') {
          this.questionsPart2.controls['questions3'].setValue(question.answer);
        } else if (question.questionId === 'question4') {
          this.questionsPart2.controls['questions4'].setValue(question.answer);
        } else if (question.questionId === 'question5') {
          this.questionsPart2.controls['questions5'].setValue(question.answer);
        } else if (question.questionId === 'question6') {
          this.questionsPart2.controls['questions6'].setValue(question.answer);
        } else if (question.questionId === 'question7') {
          this.questionsPart2.controls['questions7'].setValue(question.answer);
        } else if (question.questionId === 'question8') {
          this.questionsPart2.controls['questions8'].setValue(question.answer);
        } else if (question.questionId === 'question9') {
          this.questionsPart2.controls['questions9'].setValue(question.answer);
        } else if (question.questionId === 'question10') {
          this.questionsPart2.controls['questions10'].setValue(question.answer);
        } else if (question.questionId === 'question11') {
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
        } else if (question.questionId === 'question21') {
          this.questionsPart2.controls['questions21'].setValue(question.answer);
        } else if (question.questionId === 'question22') {
          this.questionsPart2.controls['questions22'].setValue(question.answer);
        } else if (question.questionId === 'question23') {
          this.questionsPart2.controls['questions23'].setValue(question.answer);
        } else if (question.questionId === 'question24') {
          this.questionsPart2.controls['questions24'].setValue(question.answer);
        } else if (question.questionId === 'question25') {
          this.questionsPart2.controls['questions25'].setValue(question.answer);
        } else if (question.questionId === 'question26') {
          this.questionsPart2.controls['questions26'].setValue(question.answer);
        } else if (question.questionId === 'question27') {
          this.questionsPart2.controls['questions27'].setValue(question.answer);
        } else if (question.questionId === 'question28') {
          this.questionsPart2.controls['questions28'].setValue(question.answer);
        } else if (question.questionId === 'question29') {
          this.questionsPart2.controls['questions29'].setValue(question.answer);
        } else if (question.questionId === 'question30') {
          this.questionsPart2.controls['questions30'].setValue(question.answer);
        } else if (question.questionId === 'question31') {
          this.questionsPart2.controls['questions31'].setValue(question.answer);
        } else if (question.questionId === 'question32') {
          this.questionsPart2.controls['questions32'].setValue(question.answer);
        } else if (question.questionId === 'question33') {
          this.questionsPart2.controls['questions33'].setValue(question.answer);
        } else if (question.questionId === 'question34') {
          this.questionsPart2.controls['questions34'].setValue(question.answer);
        } else if (question.questionId === 'question35') {
          this.questionsPart2.controls['questions35'].setValue(question.answer);
        } else if (question.questionId === 'question36') {
          this.questionsPart2.controls['questions36'].setValue(question.answer);
        } else if (question.questionId === 'question37') {
          this.questionsPart2.controls['questions37'].setValue(question.answer);
        } else if (question.questionId === 'question38') {
          this.questionsPart2.controls['questions38'].setValue(question.answer);
        } else if (question.questionId === 'question39') {
          this.questionsPart2.controls['questions39'].setValue(question.answer);
        } else if (question.questionId === 'question40') {
          this.questionsPart2.controls['questions40'].setValue(question.answer);
        } else if (question.questionId === 'question41') {
          this.questionsPart2.controls['questions41'].setValue(question.answer);
        } else if (question.questionId === 'question42') {
          this.questionsPart2.controls['questions42'].setValue(question.answer);
        }
      }


    }
    this.notificationservice.hideLoader();
  }

  async getAnswers(id: string) {
    this.notificationservice.showLoader();
    try {
      let response = await firstValueFrom(this.adminApi.getAnswers(id));
      this.notificationservice.hideLoader();
      this.answers = response.relationship;
      this.requestedPartnerAnswer(response.relationship.requestedPartnerForm);
      this.requestingPartnerAnswer(response.relationship.requestingPartnerForm);

    } catch (error: any) {
      this.notificationservice.hideLoader();
    }
  }
}
