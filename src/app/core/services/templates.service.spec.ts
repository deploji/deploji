import { TestBed } from '@angular/core/testing';

import { TemplatesService } from './templates.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TemplatesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: TemplatesService = TestBed.get(TemplatesService);
    expect(service).toBeTruthy();
  });
});
