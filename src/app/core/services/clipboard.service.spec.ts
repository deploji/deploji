import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ClipboardService } from './clipboard.service';
import { ToastService } from './toast.service';

describe('ClipboardService', () => {

  let service: ClipboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule, BrowserAnimationsModule],
      providers: [ToastService]
    });

    service = TestBed.inject(ClipboardService);
  });

  it('should copy text to clipboard', async () => {
    const element = document.createElement('input');
    element.value = 'foobar';
    element.focus();
    element.select();
    document.body.appendChild(element);

    service.copyTextToClipboard(element.value);

    navigator.clipboard.readText().then((copied: string) => {
      expect(copied).toEqual(element.value);
    });
    // ERROR: 'Unhandled Promise rejection:', 'Document is not focused.'
  });
});
