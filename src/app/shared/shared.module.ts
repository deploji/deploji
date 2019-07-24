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
  MatSidenavModule, MatSlideToggleModule,
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
import { DeploymentStatusComponent } from './deployment-status/deployment-status.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AnsiPipe } from './pipes/ansi.pipe';

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
  MatSlideToggleModule,
  ReactiveFormsModule,
  ScrollingModule,
];

const COMPONENTS = [
  DeploymentStatusComponent,
  NavComponent,
  FormSshKeyComponent,
  FormApplicationComponent,
  FormInventoryComponent,
  FormVersionComponent,
  FormProjectComponent,
  FormProjectFileComponent,
  FormRepositoryComponent,
];

const PIPES = [
  AnsiPipe,
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...PIPES,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ...MODULES,
  ],
  exports: [
    ...MODULES,
    ...COMPONENTS,
    ...PIPES,
  ]
})
export class SharedModule {
}
