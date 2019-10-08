import { Component, NgModule, OnInit } from '@angular/core';
import { InventoriesService } from '../../../../core/services/inventories.service';
import { Inventory } from '../../../../core/interfaces/inventory';
import { JobsService } from '../../../../core/services/jobs.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { UrlsComponentModule } from '../../shared/urls/urls.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-inventories',
  templateUrl: './inventories.component.html',
})
export class InventoriesComponent implements OnInit {
  inventories: Inventory[];
  columnsToDisplay = ['application', 'version', 'urls'];

  constructor(private inventoriesService: InventoriesService, private jobsService: JobsService) {
  }

  ngOnInit() {
    forkJoin([
      this.inventoriesService.getInventories(),
      this.jobsService.getLatestDeployments()
    ]).subscribe(([inventories, lastJobs]) => {
      inventories.forEach(inventory => {
        inventory.ApplicationInventories = inventory.ApplicationInventories.filter(value => value.IsActive === true);
        inventory.ApplicationInventories.forEach(value => {
          const deployment = lastJobs.find(job => job.InventoryID === inventory.ID && job.ApplicationID === value.ApplicationID);
          value.Version = deployment ? deployment.Version : '';
        });
      });
      this.inventories = inventories;
    });
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
