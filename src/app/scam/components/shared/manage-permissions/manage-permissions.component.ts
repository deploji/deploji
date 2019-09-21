import { Component, Input, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Permission } from '../../../../core/interfaces/permission';

@Component({
  selector: 'app-manage-permissions',
  templateUrl: './manage-permissions.component.html',
  styleUrls: ['./manage-permissions.component.scss']
})
export class ManagePermissionsComponent implements OnInit {
  @Input() permissions: Permission[] = [
    {Name: 'Staging Inventory', Type: 'Inventory', Role: 'read'},
    {Name: 'Staging Inventory', Type: 'Inventory', Role: 'admin'},
  ];
  columnsToDisplay = ['name', 'type', 'role'];

  ngOnInit() {
  }
}

@NgModule({
  declarations: [ManagePermissionsComponent],
  exports: [ManagePermissionsComponent],
  imports: [
    CommonModule,
    MatTableModule,
  ]
})
export class ManagePermissionsComponentModule {
}
