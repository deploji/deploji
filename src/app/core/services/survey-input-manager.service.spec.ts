import { TestBed } from '@angular/core/testing';

import { SurveyInputManagerService } from './survey-input-manager.service';

describe('SurveyInputManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SurveyInputManagerService = TestBed.get(SurveyInputManagerService);
    expect(service).toBeTruthy();
  });
});