import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TeamsService } from './teams.service';

describe('TeamsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: TeamsService = TestBed.get(TeamsService);
    expect(service).toBeTruthy();
  });
});
