import { SettingForm } from './setting.form';

describe('SettingForm', () => {
  it('should create an instance', () => {
    expect(new SettingForm()).toBeTruthy();
  });

  it('should be valid', () => {
    const form = new SettingForm();

    expect(form.valid).toBeTrue();
  });
});
