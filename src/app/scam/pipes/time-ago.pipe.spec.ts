import { TimeAgoPipe } from './time-ago.pipe';

describe('TimeAgoPipe', () => {
  it('create an instance', () => {
    const pipe = new TimeAgoPipe();
    expect(pipe).toBeTruthy();
  });

  it('create an instance', () => {
    const pipe = new TimeAgoPipe();
    const transformed = pipe.transform('1988-11-10T18:45:27.753012Z');

    expect(typeof transformed).toEqual('string');
    expect(transformed).toContain('years ago');
  });

  it('create an instance', () => {
    const pipe = new TimeAgoPipe();
    const transformed = pipe.transform(null);

    expect(transformed).toEqual('Invalid date');
  });
});
