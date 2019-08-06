import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../core/services/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = fb.group({
      ID: [],
      Username: ['', [Validators.required]],
      Name: [],
      Surname: [],
      Email: [],
      Password: [],
      IsActive: [],
    });
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id')) {
      this.usersService.getUser(Number(this.route.snapshot.paramMap.get('id'))).subscribe(user => {
        this.form.patchValue(user);
      });
    }
  }

  save() {
    if (!this.form.valid) {
      return;
    }
    this.usersService.save(this.form.value).subscribe(() => {
      this.router.navigateByUrl('/settings/users');
    });
  }
}
