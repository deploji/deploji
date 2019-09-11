import { TestBed } from '@angular/core/testing';

import { RepositoriesService } from './repositories.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RepositoriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: RepositoriesService = TestBed.get(RepositoriesService);
    expect(service).toBeTruthy();
  });
});
