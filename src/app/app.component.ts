import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { DEFAULT_THEME } from '../themes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'deploji';
  theme = localStorage.getItem('theme') || DEFAULT_THEME;

  constructor(private authService: AuthService, private permissionService: NgxPermissionsService) {
    this.permissionService.loadPermissions(this.authService.permissions);
  }

  setTheme(theme) {
    this.theme = theme;
    localStorage.setItem('theme', theme);
  }
}
