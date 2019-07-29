import { HttpResponse } from '@angular/common/http';

export class Collection<T> {
  items: T[];
  totalCount: number;

  constructor(response: HttpResponse<T[]>) {
    this.items = response.body;
    this.totalCount = +response.headers.get('x-total-count');
  }
}
