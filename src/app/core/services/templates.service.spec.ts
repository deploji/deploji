import { TestBed } from '@angular/core/testing';
import { TemplatesService } from './templates.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('TemplatesService', () => {

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
    const service: TemplatesService = TestBed.inject(TemplatesService);
    expect(service).toBeTruthy();
  });

  it('should save new template using POST', () => {
    const service: TemplatesService = TestBed.inject(TemplatesService);
    service.save({}).subscribe(() => {
      expect(httpClientSpy.post).toHaveBeenCalled();
    });
  });

  it('should save existing template using PUT', () => {
    const service: TemplatesService = TestBed.inject(TemplatesService);
    service.save({ID: 1}).subscribe(() => {
      expect(httpClientSpy.put).toHaveBeenCalled();
    });
  });
});
