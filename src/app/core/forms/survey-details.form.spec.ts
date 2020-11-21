import { SurveyDetailsForm } from './survey-details.form';
import { SurveyInputTypes } from '../enums/survey-input-types';
import { SurveyInput } from '../interfaces/survey-input';

describe('SurveyDetailsForm', () => {
  it('should create instance', () => {
    const form = new SurveyDetailsForm();

    expect(form).toBeTruthy();
  });

  it('should be invalid', () => {
    const form = new SurveyDetailsForm();

    expect(form.valid).toBeFalse();
  });

  it('should be valid', () => {
    const form = new SurveyDetailsForm();
    form.enable();
    form.Type.setValue(SurveyInputTypes.SELECT);
    form.Label.setValue('foo');
    form.Hint.setValue('foo');
    form.VariableName.setValue('foo');
    form.Options.setValue('foo');

    expect(form.valid).toBeTrue();
  });

  it('should return empty form values', () => {
    const form = new SurveyDetailsForm();
    const emptyFormValues: SurveyInput = form.new;

    expect(emptyFormValues.VariableName).toBeDefined();
    expect(emptyFormValues.Label).toBeDefined();
    expect(emptyFormValues.Hint).toBeDefined();
    expect(emptyFormValues.Type).toBeDefined();
    expect(emptyFormValues.Options).toBeDefined();
  });
});
