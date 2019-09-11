import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NgxPermissionsModule, NgxPermissionsService } from 'ngx-permissions';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  template: ''
})
class FakeComponent {}

describe('AuthService', () => {
  const routes: Routes = [
    {path: 'jobs', component: FakeComponent},
    {path: 'login', component: FakeComponent},
  ];
  let service: AuthService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgxPermissionsModule.forRoot(), RouterTestingModule.withRoutes(routes)],
      providers: [AuthService, NgxPermissionsService],
      declarations: [FakeComponent]
    });
    service = TestBed.get(AuthService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
