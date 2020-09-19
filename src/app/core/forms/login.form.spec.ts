import { LoginForm } from './login.form';

describe('LoginForm', () => {
  it('should create an instance', () => {
    expect(new LoginForm()).toBeTruthy();
  });

  it('should require Username and Password', () => {
    const form = new LoginForm();
    expect(form.valid).toBeFalsy();

    form.Username.setValue('user');
    expect(form.valid).toBeFalsy();

    form.Password.setValue('secret');
    expect(form.valid).toBeTruthy();
  });
});
