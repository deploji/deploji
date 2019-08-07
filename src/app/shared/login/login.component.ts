import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { throwError } from 'rxjs';
import { LoginForm } from '../../core/forms/login.form';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form = new LoginForm();

  constructor(private authService: AuthService, private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  login(formValue: any) {
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
      })
    ).subscribe();
  }
}
