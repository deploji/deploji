import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { ProgressBarComponent } from '../../scam/components/shared/progress-bar/progress-bar.component';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private snackBarRef: MatSnackBarRef<ProgressBarComponent>;

  constructor(private snackBar: MatSnackBar) {
  }

  open() {
    this.snackBarRef = this.snackBar.openFromComponent(ProgressBarComponent);
  }

  close() {
    this.snackBarRef.dismiss();
  }
}
