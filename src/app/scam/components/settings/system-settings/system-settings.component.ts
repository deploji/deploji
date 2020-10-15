import { Component, NgModule, OnInit } from '@angular/core';
import { SettingsService } from '../../../../core/services/settings.service';
import { SettingGroup } from '../../../../core/interfaces/setting-group';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../../shared/dialog/dialog-confirm/dialog-confirm.component';
import { SettingsForm } from '../../../../core/forms/settings.form';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormArray, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-system-settings',
  templateUrl: './system-settings.component.html',
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
        data: { title: 'Settings saved', message: 'Settings have been saved successfully', hideCancelButton: true}
      });
    });
  }

  generate(i: number) {
    this.settingsService.generateVapidKeys().subscribe(keys => {
      this.groups[i].Settings.forEach((setting, index) => {
        if (setting.Key === 'privateKey') {
          (this.form.Groups.at(i) as FormArray).at(index).get('Value').patchValue(keys.PrivateKey);
        }
        if (setting.Key === 'publicKey') {
          (this.form.Groups.at(i) as FormArray).at(index).get('Value').patchValue(keys.PublicKey);
        }
      });
    });
  }
}

@NgModule({
    declarations: [SystemSettingsComponent],
    exports: [SystemSettingsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule,
  ]
})
export class SystemSettingsComponentModule { }
