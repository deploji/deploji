import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class ClipboardService {
  constructor(private toast: ToastService) {
  }

  copyTextToClipboard(text) {
    if (!navigator.clipboard) {
      this.fallbackCopyTextToClipboard(text);
      return;
    }
    navigator.clipboard.writeText(text).then(() => {
      this.toast.open('the text has been copied to the clipboard');
    }, () => {
      this.toast.open('unable to copy text');
    });
  }

  private fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      if (successful) {
        this.toast.open('the text has been copied to the clipboard');
      } else {
        this.toast.open('unable to copy text');
      }
    } catch (err) {
      this.toast.open('unable to copy text');
    }

    document.body.removeChild(textArea);
  }

}
