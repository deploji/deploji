import { CreateDeploymentForm } from './create-deployment.form';
// import { ApplicationInventory } from '../interfaces/application-inventory';
// import { JobTypesEnum } from '../enums/job-types.enum';

describe('CreateDeployment.Form', () => {
  it('should create an instance', () => {
    expect(new CreateDeploymentForm()).toBeTruthy();
  });

  it('should validate', () => {
    const form = new CreateDeploymentForm();

    expect(form.valid).toBeTrue();
  });

  // it('should map to deployment value', () => {
  //   const form = new CreateDeploymentForm();
  //   const inventory: ApplicationInventory = {
  //     ID: 1, Key: null, KeyID: null, VaultKey: null, VaultKeyID: null,
  //     Application: null, Inventory: null, IsActive: true, Playbook: null
  //   };
  //   const application = {};
  //   const version = {Value: 'foo'};
  //
  //   form.Inventories.setValue([inventory]);
  //   form.Application.setValue(application);
  //   form.Version.setValue(version);
  //
  //   expect(form.deploymentsValue[0]).toEqual({
  //     Type: JobTypesEnum.DEPLOYMENT,
  //   });
  // });
});

// ype: JobTypesEnum.DEPLOYMENT,
//   ApplicationID: this.value.Application.ID,
//   Version: this.value.Version.Value,
//   InventoryID: applicationInventory.Inventory.ID,
//   KeyID: applicationInventory.KeyID,
//   VaultKeyID: applicationInventory.VaultKeyID,
//   ExtraVariables: applicationInventory.ExtraVariables,
//   Playbook: applicationInventory.Playbook || this.value.Application.AnsiblePlaybook
