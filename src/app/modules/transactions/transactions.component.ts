import { Component, OnInit } from '@angular/core';
import { ApiEkSambandhService } from 'src/app/services/api-ek-sambandh.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  payment: any[] = [
    {
      'id': ' qwju12343445656665677',
      'date': '10/12/2022',
      'relationshipID': 'Relationship-01',
      'amount': '99',
      'status': 'Success'
    }
  ]
  constructor(
    private apiService: ApiEkSambandhService
  ) { }

  ngOnInit() {
    this.apiService.getPaymentDetails().subscribe((data: any) => {
      console.log(data, 'payments')
    })
  }

}
