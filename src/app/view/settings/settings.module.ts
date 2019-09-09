import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { ProjectsComponent } from './projects/projects.component';
import { KeysComponent } from './keys/keys.component';
import { SharedModule } from '../../shared/shared.module';
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
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { FormProjectModule } from '../../scam/form/form-project/form-project.component';
import { FormInventoryModule } from '../../scam/form/form-inventory/form-inventory.component';
import { FormProjectFileModule } from '../../scam/form/form-project-file/form-project-file.component';
import { FormSshKeyModule } from '../../scam/form/form-ssh-key/form-ssh-key.component';
import { MatSelectModule } from '@angular/material/select';
import { FormRepositoryModule } from '../../scam/form/form-repository/form-repository.component';


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
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatInputModule,
    FormProjectModule,
    FormInventoryModule,
    FormProjectFileModule,
    FormSshKeyModule,
    MatSelectModule,
    FormRepositoryModule,
  ]
})
export class SettingsModule {
}
