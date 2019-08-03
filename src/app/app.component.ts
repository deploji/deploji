import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mastermind';

  constructor(private authService: AuthService, private permissionService: NgxPermissionsService) {
    this.permissionService.loadPermissions(this.authService.permissions);
  }
}
