import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../core/services/settings.service';
import { SettingGroup } from '../../core/interfaces/settingGroup';
import { MatDialog } from '@angular/material';
import { DialogConfirmComponent } from '../../shared/dialog-confirm/dialog-confirm.component';
import { SettingsForm } from '../../core/forms/settings.form';

@Component({
  selector: 'app-system-settings',
  templateUrl: './system-settings.component.html',
  styleUrls: ['./system-settings.component.scss']
})
export class SystemSettingsComponent implements OnInit {
  groups: SettingGroup[];
  form = new SettingsForm([]);

  constructor(private settingsService: SettingsService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.settingsService.getSettings().subscribe(settings => {
      this.groups = settings;
      this.form = new SettingsForm(settings);
    });
  }

  save(i: number) {
    this.settingsService.save(this.form.Groups.at(i).value).subscribe(() => {
      this.dialog.open(DialogConfirmComponent, {
        width: '500px',
        data: {title: 'Settings saved', message: 'Settings have been saved successfully', hideCancelButton: true}
      });
    });
  }
}
