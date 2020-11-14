import { TestBed } from '@angular/core/testing';
import { UsersService } from './users.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('UsersService', () => {

  const httpClientSpy = jasmine.createSpyObj<HttpClient>('HttpClient', ['post', 'put']);
  httpClientSpy.post.and.returnValues(of({}));
  httpClientSpy.put.and.returnValues(of({}));

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [
      {provide: HttpClient, useValue: httpClientSpy}
    ]
  }));

  it('should be created', () => {
    const service: UsersService = TestBed.inject(UsersService);
    expect(service).toBeTruthy();
  });

  it('should save new user using POST', () => {
    const service: UsersService = TestBed.inject(UsersService);
    service.save({}).subscribe(() => {
      expect(httpClientSpy.post).toHaveBeenCalled();
    });
  });

  it('should save existing user using PUT', () => {
    const service: UsersService = TestBed.inject(UsersService);
    service.save({ID: 1}).subscribe(() => {
      expect(httpClientSpy.put).toHaveBeenCalled();
    });
  });
});
