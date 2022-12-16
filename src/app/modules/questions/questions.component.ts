import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  items: MenuItem[];

  constructor() { }

  ngOnInit() {
    this.items = [{
      label: 'Level 1',
      routerLink: '/love-test/level-1'
    },
    {
      label: 'Level 2',
      routerLink: '/love-test/level-2'
    },
    {
      label: 'Level 3',
      routerLink: '/love-test/level-3'
    },
    {
      label: 'Level 4',
      routerLink: '/love-test/level-4'
    },
      /*  {
         label: 'Level 5',
         routerLink: 'confirmation'
       } */
    ];
  }

}
