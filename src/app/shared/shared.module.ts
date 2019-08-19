import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
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
import { UrlsComponent } from './urls/urls.component';
import { DeploymentTimeComponent } from './deployment-time/deployment-time.component';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { DurationComponent } from './duration/duration.component';
import { DurationPipe } from './pipes/duration.pipe';
import { DialogSynchronizeComponent } from './dialog-synchronize/dialog-synchronize.component';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';
import { LoginComponent } from './login/login.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { JobTypePipe } from './pipes/job-type.pipe';

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
  MatCheckboxModule,
  MatDialogModule,
  MatSelectModule,
  MatRippleModule,
  MatTableModule,
  MatTabsModule,
  MatRadioModule,
  MatSlideToggleModule,
  MatChipsModule,
  MatPaginatorModule,
  MatSlideToggleModule,
  MatTooltipModule,
  ReactiveFormsModule,
  ScrollingModule,
  NgxPermissionsModule,
];

const COMPONENTS = [
  DeploymentStatusComponent,
  DeploymentTimeComponent,
  DialogConfirmComponent,
  DialogSynchronizeComponent,
  DurationComponent,
  LoginComponent,
  NavComponent,
  FormSshKeyComponent,
  FormApplicationComponent,
  FormInventoryComponent,
  FormVersionComponent,
  FormProjectComponent,
  FormProjectFileComponent,
  FormRepositoryComponent,
  UrlsComponent,
];

const PIPES = [
  AnsiPipe,
  TimeAgoPipe,
  DurationPipe,
  JobTypePipe,
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
