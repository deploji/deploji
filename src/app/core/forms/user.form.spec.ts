import { UserForm } from './user.form';

describe('UserForm', () => {
  it('should create an instance', () => {
    expect(new UserForm()).toBeTruthy();
  });

  it('should be invalid', () => {
    const form = new UserForm();

    expect(form.valid).toBeFalse();
  });

  it('should be valid', () => {
    const form = new UserForm();
    form.Username.setValue('john_doe');

    expect(form.valid).toBeTrue();
  });
});
