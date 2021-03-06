import { CreateDeploymentForm } from './create-deployment.form';
import { ApplicationInventory } from '../interfaces/application-inventory';
import { JobTypesEnum } from '../enums/job-types.enum';

describe('CreateDeployment.Form', () => {
  it('should create an instance', () => {
    expect(new CreateDeploymentForm()).toBeTruthy();
  });

  it('should validate', () => {
    const form = new CreateDeploymentForm();

    expect(form.valid).toBeTruthy();
  });

  it('should map to deployment value', () => {
    const form = new CreateDeploymentForm();
    const inventory: ApplicationInventory = {
      ID: 1, Key: null, KeyID: null, VaultKey: null, VaultKeyID: null,
      Application: null, Inventory: {Name: ''}, IsActive: true, Playbook: null
    };
    const application = {};
    const version = {Value: 'foo'};

    form.Inventories.setValue([inventory]);
    form.Application.setValue(application);
    form.Version.setValue(version);

    expect(form.deploymentsValue[0].Type).toEqual(JobTypesEnum.DEPLOYMENT);
  });
});
