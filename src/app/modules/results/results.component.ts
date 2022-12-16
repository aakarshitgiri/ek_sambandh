import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],

})
export class ResultsComponent implements OnInit {
  @ViewChild('results', { static: false }) results: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }

  downloadResult() {
    html2canvas(this.results.nativeElement).then(canvas => {
      this.canvas.nativeElement.src = canvas.toDataURL();
      this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLink.nativeElement.download = 'ek-sambandh-result.png';
      this.downloadLink.nativeElement.click();
    });
  }

}
