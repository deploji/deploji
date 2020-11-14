import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';
import { JobsService } from './jobs.service';
import { of } from 'rxjs';
import { JobTypesEnum } from '../enums/job-types.enum';
import { Collection } from '../utils/collection';

describe('JobsService', () => {

  // tslint:disable-next-line:one-variable-per-declaration
  let jobs, httpResponse, httpClientSpy, headers;

  beforeEach(() => {
    jobs = [
      {
        Type: JobTypesEnum.JOB
      }
    ];
    headers = (new HttpHeaders()).append('x-total-count', JSON.stringify(jobs.length));
    httpResponse = new HttpResponse<any>({body: jobs, headers});
    httpClientSpy = jasmine.createSpyObj<HttpClient>('HttpClient', ['get', 'post', 'put']);
    httpClientSpy.get.and.returnValues(of(httpResponse));

    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        {provide: HttpClient, useValue: httpClientSpy}
      ]
    });
  });

  it('should be created', () => {
    const service: JobsService = TestBed.inject(JobsService);
    expect(service).toBeTruthy();
  });

  it('should wrap jobs into collection', () => {
    const service: JobsService = TestBed.inject(JobsService);
    service.getJobs().subscribe((response)  => {
      expect(response instanceof Collection).toEqual(true);
    });
  });

  it('should count the number of items', () => {
    const service: JobsService = TestBed.inject(JobsService);
    service.getJobs().subscribe((response)  => {
      expect(response.totalCount).toBeDefined();
      expect(response.totalCount === 1).toBeTruthy();
    });
  });
});
