import { Component, NgModule, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { catchError, finalize } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { DialogConfirmComponent } from '../dialog/dialog-confirm/dialog-confirm.component';
import { throwError } from 'rxjs';
import { LoginForm } from '../../../core/forms/login.form';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProgressService } from '../../../core/services/progress.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  form = new LoginForm();

  constructor(private authService: AuthService, private dialog: MatDialog, private progress: ProgressService) {
  }

  ngOnInit() {
  }

  login(formValue: any) {
    this.progress.open();
    this.authService.login(formValue).pipe(
      catchError((err) => {
        if (err.status !== 400) {
          return err;
        }
        this.dialog.open(DialogConfirmComponent, {
          width: '500px',
          data: {title: '', hideCancelButton: true, message: `Invalid username or password`}
        });
        return throwError(err);
      }),
      finalize(() => this.progress.close())
    ).subscribe();
  }
}

@NgModule({
  declarations: [LoginComponent],
  exports: [LoginComponent],
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
  ]
})
export class LoginComponentModule {
}
