import { TemplateForm } from './template.form';

describe('TemplateForm', () => {
  it('should create an instance', () => {
    expect(new TemplateForm()).toBeTruthy();
  });

  it('should be valid', () => {
    const form = new TemplateForm();
    expect(form.valid).toBeTrue();
  });
});
