import { Filter } from './filter';

describe('Filter', () => {
  const filter = new Filter('foo', 'bar');

  it('should instantiate', () => {
    expect(filter).toBeTruthy();
  });

  it('should contain key and value', () => {
    expect(filter.key).toEqual('foo');
    expect(filter.value).toEqual('bar');
  });
});
