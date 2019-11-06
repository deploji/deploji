import { Component, Input, NgModule, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { App } from '../../../../../core/interfaces/app';
import { AppsService } from '../../../../../core/services/apps.service';
import { CommonModule } from '@angular/common';
import { FormSelectComponentModule } from '../form-select/form-select.component';

@Component({
  selector: 'app-form-application',
  templateUrl: './form-application.component.html',
})
export class FormApplicationComponent implements OnInit {
  @Input() label = 'Application';
  @Input() control = new FormControl();
  @Input() apps: App[] = [];
  @Input() multiple = false;

  constructor(private appsService: AppsService) {
  }

  ngOnInit(): void {
    if (this.apps.length === 0) {
      this.appsService.getApps().subscribe(value => {
        this.apps = value;
      });
    }
  }
}

@NgModule({
  declarations: [FormApplicationComponent],
  exports: [FormApplicationComponent],
  imports: [
    CommonModule,
    FormSelectComponentModule,
  ]
})
export class FormApplicationComponentModule {
}
