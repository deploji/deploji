import { DeploymentApplicationForm } from './deployment-application.form';
import { ApplicationInventory } from '../interfaces/application-inventory';

describe('DeploymentApplicationForm', () => {
  const inventory: ApplicationInventory = {
    ID: 1,
    Key: null,
    KeyID: 1,
    VaultKey: null,
    VaultKeyID: 1,
    Application: null,
    Inventory: null,
    IsActive: false,
    Playbook: 'playbook',
    ExtraVariables: 'ExtraVariables',
  };

  it('should instantiate', () => {
    const form = new DeploymentApplicationForm(inventory);

    expect(form).toBeTruthy();
  });

  it('should be valid', () => {
    const form = new DeploymentApplicationForm(inventory);

    expect(form.valid).toBeTrue();
  });

  it('should reflect inventory', () => {
    const form = new DeploymentApplicationForm(inventory);

    expect(form.get('Application').value).toBe(inventory.Application);
    expect(form.get('Playbook').value).toBe(inventory.Playbook);
    expect(form.get('ExtraVariables').value).toBe(inventory.ExtraVariables);
    expect(form.get('KeyID').value).toBe(inventory.KeyID);
    expect(form.get('VaultKeyID').value).toBe(inventory.VaultKeyID);
  });

  it('should be active', () => {
    const form = new DeploymentApplicationForm(inventory);

    expect(form.get('IsActive').value).toBeTrue();
  });
});
