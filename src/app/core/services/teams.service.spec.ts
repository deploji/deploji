import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TeamsService } from './teams.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('TeamsService', () => {

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
    const service: TeamsService = TestBed.inject(TeamsService);
    expect(service).toBeTruthy();
  });

  it('should save new project using POST', () => {
    const service: TeamsService = TestBed.inject(TeamsService);
    service.save({}).subscribe(() => {
      expect(httpClientSpy.post).toHaveBeenCalled();
    });
  });

  it('should save existing project using PUT', () => {
    const service: TeamsService = TestBed.inject(TeamsService);
    service.save({ID: 1}).subscribe(() => {
      expect(httpClientSpy.put).toHaveBeenCalled();
    });
  });
});
