import { Component, NgModule, OnInit } from '@angular/core';
import { App } from '../../../../core/interfaces/app';
import { AppsService } from '../../../../core/services/apps.service';
import { JobsService } from '../../../../core/services/jobs.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { UrlsComponentModule } from '../../shared/urls/urls.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-applications-list',
  templateUrl: './applications-list.component.html',
})
export class ApplicationsListComponent implements OnInit {
  apps: App[] = [];
  columnsToDisplay = ['inventory', 'version', 'urls'];

  constructor(private appsService: AppsService, private jobsService: JobsService) {
  }

  ngOnInit() {
    forkJoin([
      this.appsService.getApps(),
      this.jobsService.getLatestDeployments()
    ]).subscribe(([apps, lastJobs]) => {
      apps.forEach(app => {
        app.Inventories = app.Inventories.filter(value => value.IsActive === true);
        app.Inventories.forEach(inventory => {
          const deployment = lastJobs.find(job => job.InventoryID === inventory.InventoryID && job.ApplicationID === app.ID);
          inventory.Version = deployment ? deployment.Version : '';
        });
      });
      this.apps = apps;
    });
  }
}

@NgModule({
  declarations: [ApplicationsListComponent],
  exports: [ApplicationsListComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    UrlsComponentModule,
  ]
})
export class ApplicationsListComponentModule {
}
