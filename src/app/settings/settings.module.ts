import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SettingsRoutingModule} from './settings-routing.module';
import {SettingsComponent} from './settings.component';
import {ProjectsComponent} from './projects/projects.component';
import {KeysComponent} from './keys/keys.component';
import {SharedModule} from '../shared/shared.module';
import {AddSshKeyComponent} from './add-ssh-key/add-ssh-key.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { AppsComponent } from './apps/apps.component';
import { EditAppComponent } from './edit-app/edit-app.component';
import { InventoriesComponent } from './inventories/inventories.component';
import { EditInventoryComponent } from './edit-inventory/edit-inventory.component';
import { RepositoriesComponent } from './repositories/repositories.component';
import { EditRepositoryComponent } from './edit-repository/edit-repository.component';
import { TemplatesComponent } from './templates/templates.component';


@NgModule({
  declarations: [
    SettingsComponent,
    ProjectsComponent,
    KeysComponent,
    AddSshKeyComponent,
    EditProjectComponent,
    AppsComponent,
    EditAppComponent,
    InventoriesComponent,
    EditInventoryComponent,
    RepositoriesComponent,
    EditRepositoryComponent,
    TemplatesComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule,
  ]
})
export class SettingsModule { }
