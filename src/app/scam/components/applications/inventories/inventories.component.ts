import { Component, NgModule, OnDestroy, OnInit } from '@angular/core';
import { InventoriesService } from '../../../../core/services/inventories.service';
import { JobsService } from '../../../../core/services/jobs.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { UrlsComponentModule } from '../../shared/urls/urls.component';
import { forkJoin } from 'rxjs';
import { FormInventoryComponentModule } from '../../shared/form/form-inventory/form-inventory.component';
import { FilterableComponent } from '../../../../core/classes/filterable.component';

@Component({
  selector: 'app-inventories',
  templateUrl: './inventories.component.html',
})
export class InventoriesComponent extends FilterableComponent implements OnInit, OnDestroy {
  columnsToDisplay = ['application', 'version', 'urls'];

  constructor(private inventoriesService: InventoriesService, private jobsService: JobsService) {
    super();
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
      this.options = inventories;
      this.filter();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
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
    FormInventoryComponentModule,
  ]
})
export class InventoriesComponentModule {
}
