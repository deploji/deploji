import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatIconModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NotificationChannel } from '../../../../core/forms/notification-channel.form';
import {NotificationChannelTypesEnum} from '../../../../core/enums/notification-channel-types.enum';
import {NotificationChannelsService} from '../../../../core/services/notification-channels.service';

@Component({
  selector: 'app-edit-notification-channel',
  templateUrl: './edit-notification-channel.component.html',
  styleUrls: ['./edit-notification-channel.component.scss']
})
export class EditNotificationChannelComponent implements OnInit {

  public form = new NotificationChannel();

  public channel: NotificationChannel;

  public NotificationChannelTypesEnum = NotificationChannelTypesEnum;

  public types: any = [
    NotificationChannelTypesEnum.EMAIL,
    NotificationChannelTypesEnum.WEBHOOK
  ];

  constructor(
    private notchaService: NotificationChannelsService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  save(): void {
    this.notchaService.createNotificationChannel(this.form.value).subscribe((response: NotificationChannel) => {
      this.router.navigateByUrl('/settings/notification-channels');
    });
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
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class EditNotificationChannelComponentModule {}
