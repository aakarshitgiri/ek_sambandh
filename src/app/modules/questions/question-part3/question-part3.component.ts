import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import questionpart3 from './questions-level-three.json'

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
    for (let questions of this.questionsLevel3) {
      this.shuffle(questions.options)
    }
  }

  submitForm3() {
    console.log(this.questionsPart3.value)
  }

}
