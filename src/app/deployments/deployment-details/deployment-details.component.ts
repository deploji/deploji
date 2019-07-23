import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeploymentsService } from '../../core/services/deployments.service';
import { Deployment } from '../../core/interfaces/deployment';
import { RxStompService } from '@stomp/ng2-stompjs';
import { DeploymentLog } from '../../core/interfaces/deployment-log';

@Component({
  selector: 'app-deployment-details',
  templateUrl: './deployment-details.component.html',
  styleUrls: ['./deployment-details.component.scss']
})
export class DeploymentDetailsComponent implements OnInit {
  deployment: Deployment;
  logs: DeploymentLog[] = [];

  constructor(private deploymentsService: DeploymentsService, private route: ActivatedRoute, private stomp: RxStompService) {
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id')) {
      this.deploymentsService.getDeployment(Number(this.route.snapshot.paramMap.get('id'))).subscribe(deployment => {
        this.deployment = deployment;
      });
      this.deploymentsService.getDeploymentLogs(Number(this.route.snapshot.paramMap.get('id'))).subscribe(logs => {
        this.logs = logs;
      });
    }
    this.stomp.watch(`/exchange/deployment_log_${this.route.snapshot.paramMap.get('id')}`).subscribe(value => {
      console.log(value.body);
      this.logs.push({Message: value.body});
    });
  }
}
