import { Component, Inject, NgModule } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DialogData } from '../../../../core/interfaces/dialog-data';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog-synchronize',
  templateUrl: './dialog-synchronize.component.html',
  styleUrls: ['./dialog-synchronize.component.scss']
})
export class DialogSynchronizeComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogSynchronizeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@NgModule({
  declarations: [DialogSynchronizeComponent],
  entryComponents: [DialogSynchronizeComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
  ]
})
export class DialogSynchronizeComponentModule { }
