import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { SurveyService } from './survey.service';

describe('SurveyService', () => {

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
    const service: SurveyService = TestBed.inject(SurveyService);
    expect(service).toBeTruthy();
  });

  it('should save new survey input using POST', () => {
    const service: SurveyService = TestBed.inject(SurveyService);
    service.sendSurveyInput(1, {VariableName: 'foo'}).subscribe(() => {
      expect(httpClientSpy.post).toHaveBeenCalled();
    });
  });

  it('should save existing survey input using PUT', () => {
    const service: SurveyService = TestBed.inject(SurveyService);
    service.sendSurveyInput(1, {ID: 1, VariableName: 'bar'}).subscribe(() => {
      expect(httpClientSpy.put).toHaveBeenCalled();
    });
  });
});
