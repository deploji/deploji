import { Component, OnInit } from '@angular/core';
import {DeploymentsService} from '../core/services/deployments.service';
import {Deployment} from '../core/interfaces/deployment';

@Component({
  selector: 'app-deployments',
  templateUrl: './deployments.component.html',
  styleUrls: ['./deployments.component.scss']
})
export class DeploymentsComponent implements OnInit {
  deployments: Deployment[];

  constructor(private deploymentsService: DeploymentsService) { }

  ngOnInit() {
    this.deploymentsService.getDeployments().subscribe(deployments => {
      this.deployments = deployments;
    });
  }
}
