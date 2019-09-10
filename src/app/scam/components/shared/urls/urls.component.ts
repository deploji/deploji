import { Component, Input, NgModule, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

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

@NgModule({
  declarations: [UrlsComponent],
  exports: [UrlsComponent],
  imports: [
    CommonModule
  ]
})
export class UrlsComponentModule { }
