import { HttpParamsBuilder } from './http-params-builder';
import { Page } from '../interfaces/page';
import { HttpParams } from '@angular/common/http';

describe('Http Params Builder', () => {
  const builder = new HttpParamsBuilder();
  const page: Page = {page: 3, limit: 10, orderBy: 'id asc'};
  const filters = {foo: {ID: 'bar'}};
  builder.page(page);
  builder.filters(filters);
  const params: HttpParams = builder.build();

  it('should instantiate', () => {
    expect(builder).toBeTruthy();
  });

  it('should append page, limit and orderBy params', () => {
    expect(params instanceof HttpParams).toBe(true);
    expect(params.get('page')).toEqual('3');
    expect(params.get('limit')).toEqual('10');
    expect(params.get('orderBy')).toEqual('id asc');
  });

  it('should apply filters', () => {
    expect(params.get('foo')).toEqual('bar');
  });
});
