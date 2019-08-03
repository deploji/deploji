import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../core/services/settings.service';
import { SettingGroup } from '../../core/interfaces/settingGroup';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { DialogConfirmComponent } from '../../shared/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-system-settings',
  templateUrl: './system-settings.component.html',
  styleUrls: ['./system-settings.component.scss']
})
export class SystemSettingsComponent implements OnInit {
  groups: SettingGroup[];
  form: FormGroup;

  constructor(private settingsService: SettingsService, private fb: FormBuilder, private dialog: MatDialog) {
    this.form = fb.group({
      Groups: fb.array([])
    });
  }

  get formGroups() {
    return this.form.get('Groups') as FormArray;
  }

  ngOnInit() {
    this.settingsService.getSettings().subscribe(settings => {
      this.groups = settings;
      settings.forEach(group => {
        const array = new FormArray([]);
        this.formGroups.push(array);
        group.Settings.forEach(setting => {
          array.push(this.fb.group({
            ID: [setting.ID],
            Value: [setting.Value],
            BoolValue: [setting.BoolValue]
          }));
        });
      });
    });
  }

  save(i: number) {
    this.settingsService.save(this.formGroups.at(i).value).subscribe(() => {
      this.dialog.open(DialogConfirmComponent, {
        width: '500px',
        data: {title: 'Settings saved', message: 'Settings have been saved successfully', hideCancelButton: true}
      });
    });
  }
}
