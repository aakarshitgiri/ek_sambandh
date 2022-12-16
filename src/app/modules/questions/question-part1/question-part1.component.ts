import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import questionpart1 from './questions-level-one.json'

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
    for (let questions of this.questionsLevel1) {
      this.shuffle(questions.options)
    }
  }

  submitForm1() {
    console.log(this.questionsPart1.value)
  }

}
