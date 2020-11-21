import { ProjectForm } from './project.form';

describe('ProjectForm', () => {
  it('should create an instance', () => {
    expect(new ProjectForm()).toBeTruthy();
  });

  it('should be valid', () => {
    const form = new ProjectForm();

    expect(form.valid).toBeTrue();
  });

  it('should be valid with repo url', () => {
    const form = new ProjectForm();
    form.RepoUrl.setValue('https://github.com/deploji/deploji.git');

    expect(form.valid).toBeTrue();
  });

  it('should be invalid without proper repo url', () => {
    const form = new ProjectForm();
    form.RepoUrl.setValue('foo');
    form.SshKey.reset();

    expect(form.SshKey.valid).toBeFalse();
  });
});
