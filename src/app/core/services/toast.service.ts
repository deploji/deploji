import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private snackBarRef: MatSnackBarRef<any>;

  constructor(private snackBar: MatSnackBar) {
  }

  open(message: string, timeoutMilliseconds = 5000) {
    this.snackBarRef = this.snackBar.open(message);
    if (timeoutMilliseconds !== 0) {
      setTimeout(() => {
        this.snackBarRef.dismiss();
      }, timeoutMilliseconds);
    }
  }

  close() {
    this.snackBarRef.dismiss();
  }
}
