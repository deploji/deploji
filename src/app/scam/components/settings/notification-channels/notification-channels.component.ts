import {ApplicationRef, ChangeDetectionStrategy, ChangeDetectorRef, Component, NgModule, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpErrorResponse} from '@angular/common/http';
import {MatButtonModule, MatCardModule, MatDialog, MatIconModule, MatTableModule} from '@angular/material';
import {Router, RouterModule} from '@angular/router';
import {NotificationChannel} from '../../../../core/interfaces/notification-channel';
import {NotificationChannelsService} from '../../../../core/services/notification-channels.service';
import {DialogConfirmComponent} from '../../shared/dialog/dialog-confirm/dialog-confirm.component';

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
    private router: Router,
    private detector: ChangeDetectorRef,
    private dialog: MatDialog,
    private appRef: ApplicationRef
  ) { }

  ngOnInit() {
    this.notchaService.getNotificationChannels().subscribe((response: NotificationChannel[]) => {
      this.channels = response;
    });
  }

  public delete(id: number): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '500px',
      data: {message: 'Do you want to delete the notification channel?'}
    });

    dialogRef.afterClosed().subscribe((confirmation: boolean) => {
      this.notchaService.deleteNotificationChannel(id).subscribe(
        () => {
          const index = this.channels.findIndex((channel: NotificationChannel) => channel.ID === id);

          // why is change detection not triggered?
          this.channels.splice(index, 1);

          this.router.navigateByUrl('/settings');
        },
        (error: HttpErrorResponse) => {
          // todo: handle error
        }
      );
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
    MatTableModule
  ]
})
export class NotificationChannelsComponentModule {}
