import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userData: any = [
    {
      'fullname': 'Aakarshit Giri',
      'partnerName': 'Deepika Padukone',
      'Email': 'aakarshitgiri@mailinator.com',
      'partnerEmail': 'deepikapadukone@mailinator.com',
      'relationshipStatus': true,
      'relationshipID': 'Relationship-01',
      'feeStatus': true,
      'formStatus': true,
      'partnerFormStatus': true,
      'relationshipForm': {
        0: [
          {
            'question': 'qwertyui jfiuehfie hueiwfr huier hduiehfowe',
            'answer': 'yes',
            'score': '100%'
          }
        ],
        1: [
          {
            'question': 'qwertyui jfiuehfie hueiwfr huier hduiehfowe',
            'answer': 'yes',
            'score': '100%'
          }
        ],
        2: [
          {
            'question': 'qwertyui jfiuehfie hueiwfr huier hduiehfowe',
            'answer': 'yes',
            'score': '100%'
          }
        ]
      }
    },
    {
      'fullname': 'Aakarshit Giri',
      'partnerName': 'Kriti Sonon',
      'Email': 'aakarshitgiri@mailinator.com',
      'partnerEmail': 'kritisonon@mailinator.com',
      'relationshipStatus': false,
      'relationshipID': 'Relationship-02',
      'feeStatus': true,
      'formStatus': true,
      'partnerFormStatus': true,
      'relationshipForm': {
        0: [
          {
            'question': 'qwertyui jfiuehfie hueiwfr huier hduiehfowe',
            'answer': 'yes',
            'score': '100%'
          }
        ],
        1: [
          {
            'question': 'qwertyui jfiuehfie hueiwfr huier hduiehfowe',
            'answer': 'yes',
            'score': '100%'
          }
        ],
        2: [
          {
            'question': 'qwertyui jfiuehfie hueiwfr huier hduiehfowe',
            'answer': 'yes',
            'score': '100%'
          }
        ]
      }
    },
    {
      'fullname': 'Aakarshit Giri',
      'partnerName': 'Alia Bhatt',
      'Email': 'aakarshitgiri@mailinator.com',
      'partnerEmail': 'aliabhatt@mailinator.com',
      'relationshipStatus': true,
      'relationshipID': 'Relationship-03',
      'feeStatus': false,
      'formStatus': true,
      'partnerFormStatus': true,
      'relationshipForm': {
        0: [
          {
            'question': 'qwertyui jfiuehfie hueiwfr huier hduiehfowe',
            'answer': 'yes',
            'score': '100%'
          }
        ],
        1: [
          {
            'question': 'qwertyui jfiuehfie hueiwfr huier hduiehfowe',
            'answer': 'yes',
            'score': '100%'
          }
        ],
        2: [
          {
            'question': 'qwertyui jfiuehfie hueiwfr huier hduiehfowe',
            'answer': 'yes',
            'score': '100%'
          }
        ]
      }
    },
    {
      'fullname': 'Aakarshit Giri',
      'partnerName': 'Scarlett Johansson',
      'Email': 'aakarshitgiri@mailinator.com',
      'partnerEmail': 'scarletjohansson@mailinator.com',
      'relationshipStatus': true,
      'relationshipID': 'Relationship-04',
      'feeStatus': true,
      'formStatus': false,
      'partnerFormStatus': true,
      'relationshipForm': {
        0: [
          {
            'question': 'qwertyui jfiuehfie hueiwfr huier hduiehfowe',
            'answer': 'yes',
            'score': '100%'
          }
        ],
        1: [
          {
            'question': 'qwertyui jfiuehfie hueiwfr huier hduiehfowe',
            'answer': 'yes',
            'score': '100%'
          }
        ],
        2: [
          {
            'question': 'qwertyui jfiuehfie hueiwfr huier hduiehfowe',
            'answer': 'yes',
            'score': '100%'
          }
        ]
      }
    },
    {
      'fullname': 'Aakarshit Giri',
      'partnerName': 'Alexandra Daddario',
      'Email': 'aakarshitgiri@mailinator.com',
      'partnerEmail': 'alexandradaddario@mailinator.com',
      'relationshipStatus': true,
      'relationshipID': 'Relationship-05',
      'feeStatus': true,
      'formStatus': true,
      'partnerFormStatus': false,
      'relationshipForm': {
        0: [
          {
            'question': 'qwertyui jfiuehfie hueiwfr huier hduiehfowe',
            'answer': 'yes',
            'score': '100%'
          }
        ],
        1: [
          {
            'question': 'qwertyui jfiuehfie hueiwfr huier hduiehfowe',
            'answer': 'yes',
            'score': '100%'
          }
        ],
        2: [
          {
            'question': 'qwertyui jfiuehfie hueiwfr huier hduiehfowe',
            'answer': 'yes',
            'score': '100%'
          }
        ]
      }
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
