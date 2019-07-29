import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DialogData } from '../../core/interfaces/dialog-data';

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
