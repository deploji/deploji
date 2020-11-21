import { ApplicationForm } from './application.form';
import { App } from '../interfaces/app';
import { ApplicationInventoryForm } from './application-inventory.form';

describe('ApplicationForm', () => {
  const app: App = {
    Inventories: [
      {ID: 1, Key: null, KeyID: null, VaultKey: null, VaultKeyID: null, Application: null, Inventory: null, IsActive: true, Playbook: null},
      {ID: 2, Key: null, KeyID: null, VaultKey: null, VaultKeyID: null, Application: null, Inventory: null, IsActive: true, Playbook: null}
    ]
  };

  it('should create an instance', () => {
    expect(new ApplicationForm()).toBeTruthy();
  });

  it('should be valid', () => {
    const form = new ApplicationForm();

    expect(form.valid).toBeTruthy();
  });

  it('should create application inventories', () => {
    const form = new ApplicationForm();

    form.createApplicationInventories(app);

    expect(form.Inventories.length).toBe(app.Inventories.length);
  });

  it('should add application inventory', () => {
    const form = new ApplicationForm();

    form.addInventory(1);

    expect(form.Inventories.length === 1).toBeTrue();
    expect(form.Inventories.at(0) instanceof ApplicationInventoryForm).toBeTrue();
  });

  it('should remove application inventory', () => {
    const form = new ApplicationForm();

    form.addInventory(1);
    form.removeInventory(app.Inventories[0]);

    expect(form.Inventories.length === 0).toBeTrue();
  });
});
