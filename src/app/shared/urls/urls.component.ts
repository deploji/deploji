import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-urls',
  templateUrl: './urls.component.html',
  styleUrls: ['./urls.component.scss']
})
export class UrlsComponent implements OnChanges {
  @Input() urlsString: string;
  @Input() delimiter = '\n';
  urls: string[];

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.urls = changes.urlsString.currentValue.split(this.delimiter);
  }
}
