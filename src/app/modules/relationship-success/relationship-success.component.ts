import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiEkSambandhService } from 'src/app/services/api-ek-sambandh.service';

@Component({
  selector: 'app-relationship-success',
  templateUrl: './relationship-success.component.html',
  styleUrls: ['./relationship-success.component.scss']
})
export class RelationshipSuccessComponent implements OnInit {

  constructor(
    private _activateroute: ActivatedRoute,
    private apiService: ApiEkSambandhService
  ) { }

  ngOnInit() {
    const relationshipId = this._activateroute.snapshot.queryParams['relationshipId'];
    if (relationshipId) {
      this.apiService.relationshipAccept(relationshipId).subscribe((res) => {
        console.log(res)
      })
    }
  }

}
