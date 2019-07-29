import { Page } from '../interfaces/page';
import { HttpParams } from '@angular/common/http';

export class HttpParamsBuilder {
  private params: HttpParams = new HttpParams();

  page(page: Page): HttpParamsBuilder {
    this.params = this.params.append('page', page.page.toString());
    this.params = this.params.append('limit', page.limit.toString());
    this.params = this.params.append('orderBy', page.orderBy);
    return this;
  }

  filters(filters: any): HttpParamsBuilder {
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        this.params = this.params.append(key, filters[key].ID);
      }
    });
    return this;
  }

  build(): HttpParams {
    return this.params;
  }
}
