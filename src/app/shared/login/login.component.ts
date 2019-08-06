import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private dialog: MatDialog) {
    this.form = fb.group({
      Username: ['', [Validators.required]],
      Password: ['', [Validators.required]]
    });
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
