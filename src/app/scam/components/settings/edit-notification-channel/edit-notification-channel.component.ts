import { Component, NgModule, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatIconModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NotificationChannel } from '../../../../core/forms/notification-channel.form';
import { NotificationChannelTypesEnum } from '../../../../core/enums/notification-channel-types.enum';
import { NotificationChannelsService } from '../../../../core/services/notification-channels.service';
import { NotificationChannel as INotificationChannel } from '../../../../core/interfaces/notification-channel';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-notification-channel',
  templateUrl: './edit-notification-channel.component.html',
  styleUrls: ['./edit-notification-channel.component.scss']
})
export class EditNotificationChannelComponent implements OnInit, OnDestroy {

  public form: NotificationChannel = new NotificationChannel();
  public channel: INotificationChannel;
  public types: string[] = [
    NotificationChannelTypesEnum.EMAIL,
    NotificationChannelTypesEnum.WEBHOOK
  ];
  private subscription: Subscription = new Subscription();

  constructor(
    private notchaService: NotificationChannelsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.getExistingChannel(id);
    }

    this.subscribeToForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public getExistingChannel(id: number) {
    this.notchaService.getNotificationChannel(id).subscribe(
      (channel: INotificationChannel) => {
        this.form.patchValue(channel);
        this.channel = channel;
      },
      () => {
        this.router.navigateByUrl('/settings/notification-channel/create');
      }
    );
  }

  private subscribeToForm(): void {
    const typeSubscription = this.form.Type.valueChanges.subscribe((value: string) => {
      if (NotificationChannelTypesEnum.EMAIL === value) {
        this.form.Recipients.setValidators([Validators.required]);
        this.form.Webhook.clearValidators();
      } else if (NotificationChannelTypesEnum.WEBHOOK === value) {
        this.form.Webhook.setValidators([Validators.required]);
        this.form.Recipients.clearValidators();
      }
    });

    this.subscription.add(typeSubscription);
  }

  public save(): void {
    if (this.form.valid) {
      this.notchaService.createNotificationChannel(this.form.value).subscribe(() => {
        this.router.navigateByUrl('/settings/notification-channels');
      });
    }
  }

  public update(): void {
    this.notchaService.updateNotificationChannel(this.channel.ID, this.form.value).subscribe(() => {
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
export class EditNotificationChannelComponentModule { }
