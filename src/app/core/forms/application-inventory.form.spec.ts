import { ApplicationInventoryForm } from './application-inventory.form';

describe('ApplicationInventoryForm', () => {
  it('should create an instance', () => {
    expect(new ApplicationInventoryForm()).toBeTruthy();
  });

  it('should be valid', () => {
    const form = new ApplicationInventoryForm();

    expect(form.valid).toBeTruthy();
  });
});
