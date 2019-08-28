import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppsService } from '../../core/services/apps.service';
import { InventoriesService } from '../../core/services/inventories.service';
import { ApplicationForm } from '../../core/forms/application.form';
import { forkJoin } from 'rxjs';
import { Inventory } from '../../core/interfaces/inventory';
import { SshKey } from '../../core/interfaces/ssh-key';
import { SshKeysService } from '../../core/services/ssh-keys.service';
import { ApplicationInventory } from '../../core/interfaces/application-inventory';
import { ApplicationInventoriesService } from '../../core/services/application-inventories.service';

@Component({
  selector: 'app-edit-app',
  templateUrl: './edit-app.component.html',
  styleUrls: ['./edit-app.component.scss']
})
export class EditAppComponent implements OnInit {
  form = new ApplicationForm();
  inventories: Inventory[];
  keys: SshKey[];

  constructor(
    private appsService: AppsService,
    private router: Router,
    private inventoriesService: InventoriesService,
    private applicationInventoryService: ApplicationInventoriesService,
    private keysService: SshKeysService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id')) {
      forkJoin(
        this.appsService.getApp(Number(this.route.snapshot.paramMap.get('id'))),
        this.inventoriesService.getInventories(),
        this.keysService.getKeys()
      ).subscribe(([app, inventories, keys]) => {
        this.inventories = inventories;
        this.keys = keys;
        this.form.createApplicationInventories(app);
        this.form.patchValue(app);
      });
    }
  }

  save() {
    if (!this.form.valid) {
      return;
    }
    this.appsService.save(this.form.value).subscribe(() => {
      this.router.navigateByUrl('/settings/apps');
    });
  }

  addInventory() {
    this.form.addInventory(this.form.value.ID);
  }

  delete(inventory: ApplicationInventory) {
    if (!inventory.ID) {
      this.form.removeInventory(inventory);
      return;
    }
    this.applicationInventoryService.destroy(inventory).subscribe(() => {
      this.form.removeInventory(inventory);
    });
  }
}
