import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCardModule,
  MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatListModule,
  MatMenuModule, MatSelectModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import {NavComponent} from './nav/nav.component';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import { FormSshKeyComponent } from './form-ssh-key/form-ssh-key.component';


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
  ReactiveFormsModule,
];

const COMPONENTS = [
  NavComponent,
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    FormSshKeyComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ...MODULES,
  ],
  exports: [
    ...MODULES,
    ...COMPONENTS,
    FormSshKeyComponent,
  ]
})
export class SharedModule { }
