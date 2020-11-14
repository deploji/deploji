import { TestBed } from '@angular/core/testing';
import { RepositoriesService } from './repositories.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('RepositoriesService', () => {

  const httpClientSpy = jasmine.createSpyObj<HttpClient>(['post', 'put']);
  httpClientSpy.post.and.returnValues(of({}));
  httpClientSpy.put.and.returnValues(of({}));

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [
      {provide: HttpClient, useValue: httpClientSpy}
    ]
  }));

  it('should be created', () => {
    const service: RepositoriesService = TestBed.inject(RepositoriesService);
    expect(service).toBeTruthy();
  });

  it('should save new repository using POST', () => {
    const service: RepositoriesService = TestBed.inject(RepositoriesService);
    service.save({Name: '', Type: '', Url: ''}).subscribe(() => {
      expect(httpClientSpy.post).toHaveBeenCalled();
    });
  });

  it('should save existing repository using PUT', () => {
    const service: RepositoriesService = TestBed.inject(RepositoriesService);
    service.save({ID: 1, Name: '', Type: '', Url: ''}).subscribe(() => {
      expect(httpClientSpy.put).toHaveBeenCalled();
    });
  });
});
