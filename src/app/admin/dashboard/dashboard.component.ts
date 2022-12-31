import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dashoardDataArray: any[] = [
    { "title": "Total Users", "number": 20, "route": "users", "button": "Users" },
    { "title": "Total Relationships", "number": 20, "route": "relationships", "button": "Relationships" },
    { "title": "Total Payments", "number": 20, "route": "payments", "button": "Payments" },
    { "title": "Help & Support", "number": 20, "route": "contact", "button": "Payments" }
  ]
  constructor() { }

  ngOnInit(): void {
  }

  routeToPage(data: any) { }

}
