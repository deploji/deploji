import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ApplicationsListComponentModule } from './applications-list/applications-list.component';
import { InventoriesComponentModule } from './inventories/inventories.component';
import { FormApplicationComponentModule } from '../shared/form/form-application/form-application.component';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent {
  control = new FormControl('app');
  filterControl = new FormControl();
}

@NgModule({
  declarations: [ApplicationsComponent],
  exports: [ApplicationsComponent],
  imports: [
    CommonModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    ApplicationsListComponentModule,
    InventoriesComponentModule,
    FormApplicationComponentModule,
  ]
})
export class ApplicationsComponentModule {
}
