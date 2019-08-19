import { Component, OnInit } from '@angular/core';
import { App } from '../core/interfaces/app';
import { AppsService } from '../core/services/apps.service';
import { JobsService } from '../core/services/jobs.service';
import { Deployment } from '../core/interfaces/deployment';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {
  apps: App[] = [];
  columnsToDisplay = ['inventory', 'version', 'urls'];
  latestDeployments: Deployment[];

  constructor(private appsService: AppsService, private jobsService: JobsService) {
  }

  ngOnInit() {
    this.appsService.getApps().subscribe(apps => {
      this.apps = apps;
    });
    this.jobsService.getLatestDeployments().subscribe(deployments => {
      this.latestDeployments = deployments;
    });
  }

  getDeploymentVersion(appID: number, inventoryID: number): string {
    if (!this.latestDeployments) {
      return '';
    }
    const deployment = this.latestDeployments.find(value => value.InventoryID === inventoryID && value.ApplicationID === appID);
    if (!deployment) {
      return '';
    }
    return deployment.Version;
  }
}
