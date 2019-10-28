import {Component, Input, NgModule, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule, MatSlideToggleChange, MatTableModule} from '@angular/material';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {NotificationChannel} from '../../../../core/interfaces/notification-channel';
import {NotificationChannelsService} from '../../../../core/services/notification-channels.service';
import {RelatedNotificationChannel} from '../../../../core/interfaces/related-notification-channel';
import {ApplicationNotificationChannel} from '../../../../core/interfaces/application-notification-channel';
import {ProjectNotificationChannel} from '../../../../core/interfaces/project-notification-channel';
import {TemplateNotificationChannel} from '../../../../core/interfaces/template-notification-channel';

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

  public assignedChannels: RelatedNotificationChannel[];
  public columnsToDisplay: string[] = ['Name', 'SuccessEnabled', 'FailEnabled'];

  constructor(
    private notchaService: NotificationChannelsService
  ) {}

  ngOnInit() {
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

  public onSlide(event: MatSlideToggleChange, element: RelatedNotificationChannel, type: string): void {
    element[type] = event.checked;

    if (this.applicationId) {
      const payload: ApplicationNotificationChannel = Object.assign({ApplicationID: this.applicationId}, element);
      this.notchaService.assignChannelToApplication(payload).subscribe();
    } else if (this.projectId) {
      const payload: ProjectNotificationChannel = Object.assign({ProjectID: this.projectId}, element);
      this.notchaService.assignChannelToProject(payload).subscribe();
    } else if (this.templateId) {
      const payload: TemplateNotificationChannel = Object.assign({TemplateID: this.templateId}, element);
      this.notchaService.assignChannelToTemplate(payload).subscribe();
    }
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
