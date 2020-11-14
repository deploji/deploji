import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SchedulesService } from './schedules.service';

describe('SchedulesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: SchedulesService = TestBed.inject(SchedulesService);
    expect(service).toBeTruthy();
  });
});
