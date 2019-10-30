import { ChangeDetectionStrategy, Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule, MatDialog, MatDialogRef, MatIconModule, MatTableModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { NotificationChannel } from '../../../../core/interfaces/notification-channel';
import { NotificationChannelsService } from '../../../../core/services/notification-channels.service';
import { DialogConfirmComponent } from '../../shared/dialog/dialog-confirm/dialog-confirm.component';
import { EditButtonComponentModule } from '../../shared/edit-button/edit-button.component';
import { DeleteButtonComponentModule } from '../../shared/delete-button/delete-button.component';

@Component({
  selector: 'app-notification-channels',
  templateUrl: './notification-channels.component.html',
  styleUrls: ['./notification-channels.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class NotificationChannelsComponent implements OnInit {

  public channels: NotificationChannel[] = [];

  public columnsToDisplay: string[] = ['Name', 'Type', 'Recipients', 'Webhook', 'Actions'];

  constructor(
    private notchaService: NotificationChannelsService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.notchaService.getNotificationChannels().subscribe((response: NotificationChannel[]) => {
      this.channels = response;
    });
  }

  public delete(id: number): void {
    const dialogRef: MatDialogRef<any> = this.dialog.open(DialogConfirmComponent, {
      width: '500px',
      data: { message: 'Do you want to delete the notification channel?'}
    });

    dialogRef.afterClosed().subscribe((confirmation: boolean) => {
      if (confirmation) {
        this.notchaService.deleteNotificationChannel(id).subscribe(() => {
          const index = this.channels.findIndex((channel: NotificationChannel) => channel.ID === id);

          this.channels.splice(index, 1);
          this.channels = [...this.channels];
        });
      }
    });
  }
}

@NgModule({
  declarations: [NotificationChannelsComponent],
  exports: [NotificationChannelsComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    EditButtonComponentModule,
    DeleteButtonComponentModule
  ]
})
export class NotificationChannelsComponentModule { }
