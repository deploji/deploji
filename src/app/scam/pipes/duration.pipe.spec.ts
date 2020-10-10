import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  it('create an instance', () => {
    const pipe = new DurationPipe();
    expect(pipe).toBeTruthy();
  });

  it('should convert miliseconds into hours, minutes and seconds', () => {
    const pipe = new DurationPipe();
    const transformed = pipe.transform(123456000);

    expect(transformed).toEqual('10 hours 17 minutes 36 seconds');
  });

  it('should return empty string if there are 0 miliseconds', () => {
    const pipe = new DurationPipe();
    const transformed = pipe.transform(0);

    expect(transformed).toEqual('');
  });
});
