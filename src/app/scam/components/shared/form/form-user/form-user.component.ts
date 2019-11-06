import { Component, Input, NgModule, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../../../../core/interfaces/user';
import { UsersService } from '../../../../../core/services/users.service';
import { FormSelectComponentModule } from '../form-select/form-select.component';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
})
export class FormUserComponent implements OnInit {
  @Input() label = 'User';
  @Input() users: User[] = [];
  @Input() control = new FormControl();
  @Input() multiple = false;

  constructor(private usersService: UsersService) {
  }

  ngOnInit(): void {
    if (this.users.length === 0) {
      this.usersService.getUsers().subscribe(users => {
        this.users = users;
      });
    }
  }

  displayFn(user?: User): string | undefined {
    return user ? user.Username : undefined;
  }
}

@NgModule({
  declarations: [FormUserComponent],
  exports: [FormUserComponent],
  imports: [
    CommonModule,
    FormSelectComponentModule,
  ]
})
export class FormUserComponentModule { }
