import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AnsiPipe } from './pipes/ansi.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { DurationPipe } from './pipes/duration.pipe';
import { JobTypePipe } from './pipes/job-type.pipe';
import { DialogSynchronizeComponent } from './dialog/dialog-synchronize/dialog-synchronize.component';
import { DialogConfirmComponent } from './dialog/dialog-confirm/dialog-confirm.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

const PIPES = [
  AnsiPipe,
  TimeAgoPipe,
  DurationPipe,
  JobTypePipe,
];

const DIALOGS = [
  DialogSynchronizeComponent,
  DialogConfirmComponent
];

@NgModule({
  declarations: [
    ...PIPES,
    ...DIALOGS,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    MatButtonModule,
  ],
  exports: [
    ...PIPES,
    ...DIALOGS,
  ],
  entryComponents: [...DIALOGS],
})
export class SharedModule {
}
