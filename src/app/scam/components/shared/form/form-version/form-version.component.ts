import { Component, Input, NgModule, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { VersionsService } from '../../../../../core/services/versions.service';
import { App } from '../../../../../core/interfaces/app';
import { CommonModule } from '@angular/common';
import { FormSelectComponentModule } from '../form-select/form-select.component';

@Component({
  selector: 'app-form-version',
  templateUrl: './form-version.component.html',
})
export class FormVersionComponent implements OnChanges {
  @Input() label = 'Version';
  @Input() app: App;
  @Input() control = new FormControl();
  @Input() multiple = false;
  versions: string[] = [];

  constructor(private versionsService: VersionsService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.app && changes.app.currentValue) {
      this.versionsService.getVersions(changes.app.currentValue).subscribe(versions => {
        this.versions = versions.map(version => version.Name);
      });
    }
  }

  displayFn(version) {
    return version;
  }

  compareFn(version1, version2) {
    return version1 === version2;
  }
}

@NgModule({
  declarations: [FormVersionComponent],
  exports: [FormVersionComponent],
  imports: [
    CommonModule,
    FormSelectComponentModule,
  ]
})
export class FormVersionComponentModule { }
