import { Component, NgModule, OnInit } from '@angular/core';
import { InventoriesService } from '../../../core/services/inventories.service';
import { Inventory } from '../../../core/interfaces/inventory';
import { JobsService } from '../../../core/services/jobs.service';
import { Job } from '../../../core/interfaces/job';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { UrlsComponentModule } from '../shared/urls/urls.component';

@Component({
  selector: 'app-inventories',
  templateUrl: './inventories.component.html',
})
export class InventoriesComponent implements OnInit {
  inventories: Inventory[];
  columnsToDisplay = ['application', 'version', 'urls'];
  private latestDeployments: Job[];

  constructor(private inventoriesService: InventoriesService, private jobsService: JobsService) {
  }

  getInventories(inventory: Inventory) {
    if (!inventory || !inventory.ApplicationInventories) {
      return [];
    }
    return inventory.ApplicationInventories.filter(value => value.IsActive === true);
  }

  ngOnInit() {
    this.inventoriesService.getInventories().subscribe(inventories => {
      this.inventories = inventories;
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
  declarations: [InventoriesComponent],
  exports: [InventoriesComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    UrlsComponentModule,
  ]
})
export class InventoriesComponentModule {
}
