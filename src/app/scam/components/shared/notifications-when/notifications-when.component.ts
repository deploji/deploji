import {Component, Input, NgModule, OnInit, ViewChildren} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule, MatSlideToggle, MatSlideToggleChange, MatTableModule} from '@angular/material';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {NotificationChannel} from '../../../../core/interfaces/notification-channel';
import {NotificationChannelsService} from '../../../../core/services/notification-channels.service';
import {RelatedNotificationChannel} from '../../../../core/interfaces/related-notification-channel';

@Component({
  selector: 'app-notifications-when',
  templateUrl: './notifications-when.component.html',
  styleUrls: ['./notifications-when.component.scss']
})
export class NotificationsWhenComponent implements OnInit {

  @Input()
  public applicationId: number;

  @Input()
  public projectId: number;

  @Input()
  public templateId: number;

  @ViewChildren(MatSlideToggle)
  public matSlideToggleRefs: any;

  public assignedChannels: RelatedNotificationChannel[];
  public allChannels: NotificationChannel[];
  public columnsToDisplay: string[] = ['Name', 'SuccessEnabled', 'FailEnabled'];
  public channelsToEmit: any = new Map();

  constructor(
    private notchaService: NotificationChannelsService
  ) {}

  ngOnInit() {
    this.notchaService.getNotificationChannels().subscribe((response: NotificationChannel[]) => {
      this.allChannels = response;
    });

    this.getRelatedNotificationChannels();
  }

  private getRelatedNotificationChannels(): void {
    if (this.applicationId) {
      this.notchaService.getApplicationNotificationChannels(this.applicationId).subscribe((response: RelatedNotificationChannel[]) => {
        this.assignedChannels = response;
      });
    } else if (this.projectId) {
      this.notchaService.getProjectNotificationChannels(this.projectId).subscribe((response: RelatedNotificationChannel[]) => {
        this.assignedChannels = response;
      });
    } else if (this.templateId) {
      this.notchaService.getTemplateNotificationChannels(this.templateId).subscribe((response: RelatedNotificationChannel[]) => {
        this.assignedChannels = response;
      });
    }
  }

  public onSlide(event: MatSlideToggleChange, element: NotificationChannel, type: string): void {
    const data: any = this.channelsToEmit.has(element.ID) ? this.channelsToEmit.get(element.ID) : {};
    data[type] = event.checked;

    this.channelsToEmit.set(element.ID, data);
    this.channelsToEmit.forEach((options: RelatedNotificationChannel, channelId: number) => {
      options.NotificationChannelID = channelId;
    });
  }

  public isChecked(element: NotificationChannel, type: string): boolean {
    if (this.assignedChannels) {
      const channel: RelatedNotificationChannel = this.assignedChannels.find((assignedChannel: RelatedNotificationChannel) => {
        return assignedChannel.NotificationChannelID === element.ID;
      });

      if (channel) {
        return type === 'SuccessEnabled' ? channel.SuccessEnabled : channel.FailEnabled;
      }
    }

    return false;
  }
}

@NgModule({
  declarations: [NotificationsWhenComponent],
  exports: [NotificationsWhenComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatSlideToggleModule
  ]
})
export class NotificationsWhenComponentModule {}
