import { Component, NgModule, OnInit } from '@angular/core';
import { App } from '../../../core/interfaces/app';
import { AppsService } from '../../../core/services/apps.service';
import { JobsService } from '../../../core/services/jobs.service';
import { Job } from '../../../core/interfaces/job';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { UrlsComponentModule } from '../shared/urls/urls.component';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
})
export class ApplicationsComponent implements OnInit {
  apps: App[] = [];
  columnsToDisplay = ['inventory', 'version', 'urls'];
  latestDeployments: Job[];

  constructor(private appsService: AppsService, private jobsService: JobsService) {
  }

  inventories(app: App) {
    if (!app || !app.Inventories) {
      return [];
    }
    return app.Inventories.filter(value => value.IsActive === true);
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

@NgModule({
    declarations: [ApplicationsComponent],
    exports: [ApplicationsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    UrlsComponentModule,
  ]
})
export class ApplicationsComponentModule {}
