import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProgressService } from './progress.service';

describe('ProgressService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule, BrowserAnimationsModule],
      declarations: []
    });
  });

  it('should be created', () => {
    const service: ProgressService = TestBed.inject(ProgressService);
    expect(service).toBeTruthy();
  });
});
