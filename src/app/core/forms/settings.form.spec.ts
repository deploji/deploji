import { SettingsForm } from './settings.form';

describe('SettingsForm', () => {
  it('should create an instance', () => {
    expect(new SettingsForm([])).toBeTruthy();
  });

  it('should be valid', () => {
    const form = new SettingsForm([]);

    expect(form).toBeTruthy();
  });
});
