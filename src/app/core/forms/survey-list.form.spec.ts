import { SurveyListForm } from './survey-list.form';

describe('SurveyListForm', () => {
  it('should create an instance', () => {
    const form = new SurveyListForm();
    expect(form).toBeTruthy();
  });

  it('should be valid', () => {
    const form = new SurveyListForm();
    expect(form.valid).toBeTrue();
  });

  it('should add extra variables to form', () => {
    const form = new SurveyListForm();
    form.addControl('foo');

    expect(form.extraVariables.length === 1).toBeTrue();
    expect(form.extraVariables.at(0).value).toBe('foo');
  });
});
