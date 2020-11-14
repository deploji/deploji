import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgxPermissionsModule, NgxPermissionsService } from 'ngx-permissions';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { UserTypesEnum } from '../enums/user-types.enum';

@Component({
  template: ''
})
class FakeComponent { }

describe('AuthService', () => {
  const routes: Routes = [
    { path: 'jobs', component: FakeComponent},
    { path: 'login', component: FakeComponent},
  ];
  let service: AuthService;
  const routerServiceSpy = jasmine.createSpyObj<Router>('Router', ['navigateByUrl']);
  routerServiceSpy.navigateByUrl.and.callThrough();
  const adminTokenResponse = {Token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDUxNzk2OTYsImlhdCI6MTYwNTE3ODc5NiwibmJmIjoxNjA1MTc4Nzk2LCJzdWIiOiJhZG1pbiIsInVpZCI6MSwidXRwIjoiYWRtaW4ifQ.k79DMqT5PO615XJ9lrlASM6wlxbbk59igKkJ1w5WXE0'};
  const httpSpy = jasmine.createSpyObj<HttpClient>('HttpClient', ['get', 'post', 'put']);
  httpSpy.post.and.returnValue(of(adminTokenResponse));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NgxPermissionsModule.forRoot(),
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [
        AuthService, NgxPermissionsService,
        {provide: HttpClient, useValue: httpSpy},
        {provide: Router, useValue: routerServiceSpy}
      ],
      declarations: [FakeComponent]
    });
    service = TestBed.inject(AuthService);
  });

  afterEach(() => {
    localStorage.clear();
    service.logout();
    httpSpy.post.and.returnValue(of(adminTokenResponse));
    routerServiceSpy.navigateByUrl.calls.reset();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set guest permissions if token is absent', async() => {
    expect(service.permissions).toEqual([UserTypesEnum.GUEST]);
  });

  it('should set encoded token in localstorage', async () => {
    service.login({}).subscribe((token) => {
      expect(localStorage.getItem('token')).toEqual(token.Token);
    });
  });

  it('should set admin permissions if token with admin utp was received', async () => {
    service.login({}).subscribe(() => {
      expect(service.permissions).toEqual([UserTypesEnum.ADMIN]);
    });
  });

  it('should set regular user permissions if token with regular user permissions was received', async () => {
    const regularTokenResponse = {Token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDUxNzk2OTYsImlhdCI6MTYwNTE3ODc5NiwibmJmIjoxNjA1MTc4Nzk2LCJzdWIiOiJhZG1pbiIsInVpZCI6MSwidXRwIjpudWxsLCJwZXJtIjpbInJlZ3VsYXIiXX0.p5uzf6PUVGup4IbW8eSo3osAauvWK1nogzxfxwPmvF0'};
    httpSpy.post.and.returnValue(of(regularTokenResponse));

    service.login({}).subscribe(() => {
      expect(service.permissions).toEqual([UserTypesEnum.REGULAR]);
    });
  });

  it('should set auditor user permissions if token with auditor user permissions was received', async () => {
    const regularTokenResponse = {Token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDUxNzk2OTYsImlhdCI6MTYwNTE3ODc5NiwibmJmIjoxNjA1MTc4Nzk2LCJzdWIiOiJhZG1pbiIsInVpZCI6MSwidXRwIjpudWxsLCJwZXJtIjpbImF1ZGl0b3IiXX0.e8_h-HI1x0dDO6kwdbFA_zk11MCPP_AFOhPyc7df_bM'};
    httpSpy.post.and.returnValue(of(regularTokenResponse));

    service.login({}).subscribe(() => {
      expect(service.permissions).toEqual([UserTypesEnum.AUDITOR]);
    });
  });

  it('should redirect to jobs', async () => {
    service.login({}).subscribe(() => {
      expect(routerServiceSpy.navigateByUrl).toHaveBeenCalledWith('/jobs');
    });
  });

  // WARN: 'Spec 'AuthService should refresh token' has no expectations.'
  // it('should refresh token', async () => {
  // tslint:disable-next-line:max-line-length
  //   const refreshTokenResponse = {Token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDUxODkzNzgsImlhdCI6MTYwNTE4ODM5MCwibmJmIjoxNjA1MTg4NDc4LCJzdWIiOiJhZG1pbiIsInVpZCI6MSwidXRwIjoiYWRtaW4ifQ.YKRpJjT4ea5EZK_S60Bju0oETznuaWCoSb_O0_yIKAY'};
  //   httpSpy.post.and.returnValues(of(refreshTokenResponse));
  //
  //   service.refreshToken().subscribe((response) => {
  //     expect(localStorage.getItem('token')).toEqual(response.Token);
  //   });
  // });

  it('should clear token from localStorage upon logout', async () => {
    service.logout();

    expect(localStorage.getItem('token')).toBeFalsy();
  });

  it('should set guest user permission after logout', async () => {
    service.logout();

    expect(service.permissions).toEqual([UserTypesEnum.GUEST]);
  });

  it('should redirect to login page after logout', async () => {
    service.logout();

    expect(routerServiceSpy.navigateByUrl).toHaveBeenCalledWith('/login');
  });
});
