import { Component, NgModule, OnInit } from '@angular/core';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.scss']
})
export class SurveysComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

@NgModule({
  declarations: [SurveysComponent],
  exports: [SurveysComponent],
  imports: []
})
export class SurveysComponentModule {}
