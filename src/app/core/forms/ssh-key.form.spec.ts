import { SshKeyForm } from './ssh-key.form';

describe('SshKeyForm', () => {
  it('should create an instance', () => {
    expect(new SshKeyForm()).toBeTruthy();
  });

  it('should be valid', () => {
    const form = new SshKeyForm();

    expect(form.valid).toBeTrue();
  });
});
