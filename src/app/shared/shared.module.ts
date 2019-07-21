import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import { NavComponent } from './nav/nav.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormSshKeyComponent } from './form-ssh-key/form-ssh-key.component';
import { FormApplicationComponent } from './form-application/form-application.component';
import { FormInventoryComponent } from './form-inventory/form-inventory.component';
import { FormVersionComponent } from './form-version/form-version.component';
import { FormProjectComponent } from './form-project/form-project.component';
import { FormProjectFileComponent } from './form-project-file/form-project-file.component';
import { FormRepositoryComponent } from './form-repository/form-repository.component';


const MODULES = [
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatSelectModule,
  MatRippleModule,
  ReactiveFormsModule,
];

const COMPONENTS = [
  NavComponent,
  FormSshKeyComponent,
  FormApplicationComponent,
  FormInventoryComponent,
  FormVersionComponent,
  FormProjectComponent,
  FormProjectFileComponent,
  FormRepositoryComponent,
];

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ...MODULES,
  ],
  exports: [
    ...MODULES,
    ...COMPONENTS,
  ]
})
export class SharedModule {
}
