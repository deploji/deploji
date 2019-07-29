import { Component, Input, OnInit } from '@angular/core';
import { Deployment } from '../../core/interfaces/deployment';

@Component({
  selector: 'app-deployment-time',
  templateUrl: './deployment-time.component.html',
  styleUrls: ['./deployment-time.component.scss']
})
export class DeploymentTimeComponent implements OnInit {
  @Input() deployment: Deployment;

  constructor() { }

  ngOnInit() {
  }
}
