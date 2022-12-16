import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import questionpart2 from './questions-level-two.json'

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
    for (let questions of this.questionsLevel2) {
      this.shuffle(questions.options)
    }
  }

  submitForm2() {
    console.log(this.questionsPart2.value)
  }

}
