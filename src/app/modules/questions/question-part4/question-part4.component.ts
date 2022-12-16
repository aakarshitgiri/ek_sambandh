import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import questionpart4 from './questions-level-four.json'

@Component({
  selector: 'app-question-part4',
  templateUrl: './question-part4.component.html',
  styleUrls: ['./question-part4.component.scss']
})
export class QuestionPart4Component implements OnInit {
  questionsLevel4: any[] = questionpart4;
  questionsPart4: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { }
  ngOnInit() {
    this.questionsPart4 = this.formBuilder.group({
      questions31: new FormControl('', Validators.required),
      questions32: new FormControl('', Validators.required),
      questions33: new FormControl('', Validators.required),
      questions34: new FormControl('', Validators.required),
      questions35: new FormControl('', Validators.required),
      questions36: new FormControl('', Validators.required),
    });

    this.randomizeAnswer();
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
    console.log(this.questionsPart4.value)
  }

}
