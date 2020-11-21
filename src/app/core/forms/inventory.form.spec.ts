import { InventoryForm } from './inventory.form';

describe('InventoryForm', () => {
  it('should create an instance', () => {
    expect(new InventoryForm()).toBeTruthy();
  });

  it('should be valid', () => {
    expect(new InventoryForm().valid).toBeTrue();
  });
});
