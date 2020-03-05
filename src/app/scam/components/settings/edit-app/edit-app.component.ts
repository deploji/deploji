import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { forkJoin } from 'rxjs';
import { AppsService } from '../../../../core/services/apps.service';
import { InventoriesService } from '../../../../core/services/inventories.service';
import { ApplicationForm } from '../../../../core/forms/application.form';
import { Inventory } from '../../../../core/interfaces/inventory';
import { SshKey } from '../../../../core/interfaces/ssh-key';
import { SshKeysService } from '../../../../core/services/ssh-keys.service';
import { ApplicationInventory } from '../../../../core/interfaces/application-inventory';
import { ApplicationInventoriesService } from '../../../../core/services/application-inventories.service';
import { FormProjectComponentModule } from '../../shared/form/form-project/form-project.component';
import { FormProjectFileComponentModule } from '../../shared/form/form-project-file/form-project-file.component';
import { FormInventoryComponentModule } from '../../shared/form/form-inventory/form-inventory.component';
import { FormSshKeyComponentModule } from '../../shared/form/form-ssh-key/form-ssh-key.component';
import { FormRepositoryComponentModule } from '../../shared/form/form-repository/form-repository.component';
import { ManagePermissionsComponentModule } from '../../shared/manage-permissions/manage-permissions.component';
import { App } from '../../../../core/interfaces/app';
import { NotificationsWhenComponent, NotificationsWhenComponentModule } from '../../shared/notifications-when/notifications-when.component';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-edit-app',
  templateUrl: './edit-app.component.html',
})
export class EditAppComponent implements OnInit {

  @ViewChild(NotificationsWhenComponent)
  public notificationsWhenComponentRef: any;

  public form = new ApplicationForm();
  public inventories: Inventory[];
  public keys: SshKey[];
  public app: App;
  public applicationId;

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
    this.applicationId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.applicationId) {
      forkJoin([
        this.appsService.getApp(this.applicationId),
        this.inventoriesService.getInventories(),
        this.keysService.getKeys()
      ]).subscribe(([app, inventories, keys]) => {
        this.inventories = inventories;
        this.keys = keys;
        this.app = app;
        this.form.createApplicationInventories(app);
        this.form.patchValue(app);
      });
    }
  }

  save() {
    if (this.form.valid) {
      this.appsService.save(this.form.value).subscribe(() => {
        this.router.navigateByUrl('/settings/apps');
      });
    }
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
    MatTabsModule,
    ManagePermissionsComponentModule,
    NotificationsWhenComponentModule,
    MatExpansionModule
  ]
})
export class EditAppComponentModule {
}
