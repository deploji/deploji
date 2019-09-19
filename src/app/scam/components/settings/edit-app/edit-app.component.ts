import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AppsService } from '../../../../core/services/apps.service';
import { InventoriesService } from '../../../../core/services/inventories.service';
import { ApplicationForm } from '../../../../core/forms/application.form';
import { forkJoin } from 'rxjs';
import { Inventory } from '../../../../core/interfaces/inventory';
import { SshKey } from '../../../../core/interfaces/ssh-key';
import { SshKeysService } from '../../../../core/services/ssh-keys.service';
import { ApplicationInventory } from '../../../../core/interfaces/application-inventory';
import { ApplicationInventoriesService } from '../../../../core/services/application-inventories.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormProjectComponentModule } from '../../shared/form/form-project/form-project.component';
import { FormProjectFileComponentModule } from '../../shared/form/form-project-file/form-project-file.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormInventoryComponentModule } from '../../shared/form/form-inventory/form-inventory.component';
import { FormSshKeyComponentModule } from '../../shared/form/form-ssh-key/form-ssh-key.component';
import { FormRepositoryComponentModule } from '../../shared/form/form-repository/form-repository.component';

@Component({
  selector: 'app-edit-app',
  templateUrl: './edit-app.component.html',
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
      forkJoin([
        this.appsService.getApp(Number(this.route.snapshot.paramMap.get('id'))),
        this.inventoriesService.getInventories(),
        this.keysService.getKeys()
      ]).subscribe(([app, inventories, keys]) => {
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

@NgModule({
  declarations: [EditAppComponent],
  exports: [EditAppComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormProjectComponentModule,
    FormProjectFileComponentModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    FormInventoryComponentModule,
    FormSshKeyComponentModule,
    RouterModule,
    FormRepositoryComponentModule,
  ]
})
export class EditAppComponentModule {
}
