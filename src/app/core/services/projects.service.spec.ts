import { TestBed } from '@angular/core/testing';

import { ProjectsService } from './projects.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('ProjectsService', () => {

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
    const service: ProjectsService = TestBed.inject(ProjectsService);
    expect(service).toBeTruthy();
  });

  it('should save new project using POST', () => {
    const service: ProjectsService = TestBed.inject(ProjectsService);
    service.save({Name: 'Foo', RepoUrl: '', RepoBranch: ''}).subscribe(() => {
      expect(httpClientSpy.post).toHaveBeenCalled();
    });
  });

  it('should save existing project using PUT', () => {
    const service: ProjectsService = TestBed.inject(ProjectsService);
    service.save({ID: 1, Name: 'Foo', RepoUrl: '', RepoBranch: ''}).subscribe(() => {
      expect(httpClientSpy.put).toHaveBeenCalled();
    });
  });
});
