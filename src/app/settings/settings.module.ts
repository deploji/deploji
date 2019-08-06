import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { ProjectsComponent } from './projects/projects.component';
import { KeysComponent } from './keys/keys.component';
import { SharedModule } from '../shared/shared.module';
import { EditSshKeyComponent } from './edit-ssh-key/edit-ssh-key.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { AppsComponent } from './apps/apps.component';
import { EditAppComponent } from './edit-app/edit-app.component';
import { InventoriesComponent } from './inventories/inventories.component';
import { EditInventoryComponent } from './edit-inventory/edit-inventory.component';
import { RepositoriesComponent } from './repositories/repositories.component';
import { EditRepositoryComponent } from './edit-repository/edit-repository.component';
import { TemplatesComponent } from './templates/templates.component';
import { EditTemplateComponent } from './edit-template/edit-template.component';
import { SystemSettingsComponent } from './system-settings/system-settings.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UsersComponent } from './users/users.component';


@NgModule({
  declarations: [
    SettingsComponent,
    ProjectsComponent,
    KeysComponent,
    EditSshKeyComponent,
    EditProjectComponent,
    AppsComponent,
    EditAppComponent,
    InventoriesComponent,
    EditInventoryComponent,
    RepositoriesComponent,
    EditRepositoryComponent,
    TemplatesComponent,
    EditTemplateComponent,
    SystemSettingsComponent,
    EditUserComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule,
  ]
})
export class SettingsModule {
}
