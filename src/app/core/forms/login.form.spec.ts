import { LoginForm } from './login.form';

describe('LoginForm', () => {
  it('should create an instance', () => {
    expect(new LoginForm()).toBeTruthy();
  });

  it('should be invalid', () => {
    const form = new LoginForm();

    expect(form.valid).toBeFalse();
  });

  it('should require Username and Password', () => {
    const form = new LoginForm();
    form.Username.setValue('user');
    form.Password.setValue('secret');

    expect(form.valid).toBeTrue();
  });
});
