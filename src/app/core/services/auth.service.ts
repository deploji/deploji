import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { NgxPermissionsService } from 'ngx-permissions';
import { Router } from '@angular/router';
import { UserTypesEnum } from '../enums/user-types.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtTokenString: string;
  private decodedToken: any;

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
      return [UserTypesEnum.GUEST];
    }
    const perm = [];
    if (Array.isArray(this.token.perm)) {
      perm.push(this.token.perm);
    }
    if (this.token.utp === UserTypesEnum.ADMIN) {
      perm.push(UserTypesEnum.ADMIN);
    }
    return perm;
  }

  private loadToken() {
    this.jwtTokenString = localStorage.getItem('token');
    if (this.jwtTokenString) {
      try {
        this.decodedToken = jwt_decode(this.jwtTokenString);
      } catch (error) {
        console.warn(error);
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
    return this.http.post('/api/auth/refresh', null, { observe: 'response'}).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.body.Token);
        this.loadToken();
      })
    );
  }
}
