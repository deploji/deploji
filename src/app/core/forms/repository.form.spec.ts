import { RepositoryForm } from './repository.form';
import { RepositoryTypesEnum } from '../enums/repository-types.enum';

describe('RepositoryForm', () => {
  it('should create an instance', () => {
    expect(new RepositoryForm()).toBeTruthy();
  });

  it('should be invalid', () => {
    const form = new RepositoryForm();

    expect(form.valid).toBeFalse();
  });

  it('should be valid', () => {
    const form = new RepositoryForm();
    form.Name.setValue('foo');
    form.Url.setValue('https://github.com/deploji/deploji.git');
    form.Type.setValue('foo');

    expect(form.valid).toBeTrue();
  });

  it('should be invalid without NexusName if repository type is NEXUS_V3_MAVEN', () => {
    const form = new RepositoryForm();
    form.Name.setValue('foo');
    form.Url.setValue('https://github.com/deploji/deploji.git');
    form.Type.setValue(RepositoryTypesEnum.NEXUS_V3_MAVEN);
    form.NexusName.reset();

    expect(form.valid).toBeFalse();
  });

  it('should be valid with NexusName if repository type is NEXUS_V3_MAVEN', () => {
    const form = new RepositoryForm();
    form.Type.setValue(RepositoryTypesEnum.NEXUS_V3_MAVEN);
    form.Name.setValue('foo');
    form.Url.setValue('https://github.com/deploji/deploji.git');
    form.NexusName.setValue('foo');

    expect(form.valid).toBeTrue();
  });
});
