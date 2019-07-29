import { TestBed } from '@angular/core/testing';

import { TemplatesService } from './templates.service';

describe('TemplatesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TemplatesService = TestBed.get(TemplatesService);
    expect(service).toBeTruthy();
  });
});
