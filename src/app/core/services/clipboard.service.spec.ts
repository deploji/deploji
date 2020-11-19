import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ClipboardService } from './clipboard.service';
import { ToastService } from './toast.service';

describe('ClipboardService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule, BrowserAnimationsModule],
      providers: [ToastService]
    });
  });

  it('should create', () => {
    const service: ClipboardService = TestBed.inject(ClipboardService);
    expect(service).toBeTruthy();
  });
});
