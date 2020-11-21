import { DeploymentFiltersForm } from './deployment-filters.form';

describe('DeploymentFiltersForm', () => {
  it('should create an instance', () => {
    expect(new DeploymentFiltersForm()).toBeTruthy();
  });

  it('should be valid', () => {
    expect(new DeploymentFiltersForm().valid).toBeTrue();
  });
});
