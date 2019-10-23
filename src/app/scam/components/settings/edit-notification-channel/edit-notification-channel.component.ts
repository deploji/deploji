import {Component, NgModule, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatCardModule, MatIconModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import {NotificationChannelsComponent} from '../notification-channels/notification-channels.component';

@Component({
  selector: 'app-edit-notification-channel',
  templateUrl: './edit-notification-channel.component.html',
  styleUrls: ['./edit-notification-channel.component.scss']
})
export class EditNotificationChannelComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

@NgModule({
  declarations: [EditNotificationChannelComponent],
  exports: [EditNotificationChannelComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
    MatCardModule,
    MatIconModule
  ]
})
export class EditNotificationChannelComponentModule {}
