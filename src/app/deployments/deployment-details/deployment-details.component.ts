import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeploymentsService } from '../../core/services/deployments.service';
import { Deployment } from '../../core/interfaces/deployment';

@Component({
  selector: 'app-deployment-details',
  templateUrl: './deployment-details.component.html',
  styleUrls: ['./deployment-details.component.scss']
})
export class DeploymentDetailsComponent implements OnInit {
  deployment: Deployment;

  constructor(private deploymentsService: DeploymentsService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id')) {
      this.deploymentsService.getDeployment(Number(this.route.snapshot.paramMap.get('id'))).subscribe(deployment => {
        this.deployment = deployment;
      });
    }
  }
}
