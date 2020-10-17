import { TestBed } from '@angular/core/testing';
import { SurveyInputManagerService } from './survey-input-manager.service';

describe('SurveyInputManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SurveyInputManagerService = TestBed.inject(SurveyInputManagerService);
    expect(service).toBeTruthy();
  });

  it('should parse options given as a string separated by spaces', () => {
    const service: SurveyInputManagerService = TestBed.inject(SurveyInputManagerService);
    const result = service.parseOptions('motor goll skuter admin');

    expect(result).toEqual(['motor', 'goll', 'skuter', 'admin']);
  });

  it('should parse options given as a string separated by comma', () => {
    const service: SurveyInputManagerService = TestBed.inject(SurveyInputManagerService);
    const result = service.parseOptions('motor, goll, skuter, admin');

    expect(result).toEqual(['motor', 'goll', 'skuter', 'admin']);
  });

  it('should parse options given as a string separated by semicolon', () => {
    const service: SurveyInputManagerService = TestBed.inject(SurveyInputManagerService);
    const result = service.parseOptions('motor;goll;skuter;admin');

    expect(result).toEqual(['motor', 'goll', 'skuter', 'admin']);
  });

  it('should parse options given as a string separated by a mix of characters', () => {
    const service: SurveyInputManagerService = TestBed.inject(SurveyInputManagerService);
    const result = service.parseOptions('motor ; goll , skuter;admin,sti24 portal');

    expect(result).toEqual(['motor', 'goll', 'skuter', 'admin', 'sti24', 'portal']);
  });
});
