import { notEmpty } from './utils';

describe('Utilities', () => {
  it('should recognize not empty value', () => {
    expect(notEmpty('')).toEqual(false);
    expect(notEmpty(null)).toEqual(false);
  });

  it('should recognize empty value', () => {
    expect(notEmpty('Lorem ipsum dolor sit amet')).toEqual(true);
  });
});
