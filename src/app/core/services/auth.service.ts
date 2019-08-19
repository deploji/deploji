import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { NgxPermissionsService } from 'ngx-permissions';
import { Router } from '@angular/router';
import { RolesEnum } from '../enums/roles.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtTokenString: string;
  private decodedToken: any;
  private perm: string[] = [];

  constructor(private http: HttpClient, private permissionsService: NgxPermissionsService, private router: Router) { }

  get tokenString() {
    if (!this.jwtTokenString) {
      this.loadToken();
    }
    return this.jwtTokenString;
  }

  get token() {
    if (!this.decodedToken) {
      this.loadToken();
    }
    return this.decodedToken;
  }

  get permissions(): string[] {
    if (!this.token) {
      return [RolesEnum.GUEST];
    }
    if (!Array.isArray(this.token.perm) || this.token.perm.length === 0) {
      return [];
    }
    return this.token.perm;
  }

  private loadToken() {
    this.jwtTokenString = localStorage.getItem('token');
    if (this.jwtTokenString) {
      try {
        this.decodedToken = jwt_decode(this.jwtTokenString);
      } catch (ignored) {
      }
    } else {
      this.decodedToken = undefined;
    }
  }

  login(formValue: any) {
    return this.http.post('/api/auth/authenticate', formValue).pipe(
      tap((token: any) => {
        localStorage.setItem('token', token.Token);
        this.loadToken();
        this.permissionsService.flushPermissions();
        this.permissionsService.loadPermissions(this.permissions);
        this.router.navigateByUrl('/jobs');
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.loadToken();
    this.permissionsService.flushPermissions();
    this.permissionsService.loadPermissions(this.permissions);
    this.router.navigateByUrl('/login');
  }

  refreshToken() {
    return this.http.post('/api/auth/refresh', null, {observe: 'response'}).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.body.Token);
        this.loadToken();
      })
    );
  }
}
