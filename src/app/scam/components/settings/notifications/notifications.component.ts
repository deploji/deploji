import { Component, OnInit, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { MatCardModule } from '@angular/material/card/typings/card-module';
// import { MatFormFieldModule, MatInputModule, MatSlideToggleModule, MatButtonModule, MatTabsModule } from '@angular/material/typings';
import { RouterModule } from '@angular/router';
import { ManageUsersComponentModule } from '../../shared/manage-users/manage-users.component';
import { ManagePermissionsComponentModule } from '../../shared/manage-permissions/manage-permissions.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

@NgModule({
  declarations: [NotificationsComponent],
  exports: [NotificationsComponent],
  imports: [

  ]
})
export class NotificationsComponentModule {
}