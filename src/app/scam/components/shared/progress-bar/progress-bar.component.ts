import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  template: `
    <div class="center">
      <div class="mb1" i18n>Loading...</div>
      <mat-progress-bar mode="query"></mat-progress-bar>
    </div>
  `
})
export class ProgressBarComponent {
}

@NgModule({
  declarations: [ProgressBarComponent],
  entryComponents: [ProgressBarComponent],
  exports: [ProgressBarComponent],
  imports: [
    CommonModule,
    MatProgressBarModule
  ]
})
export class ProgressBarComponentModule {
}
