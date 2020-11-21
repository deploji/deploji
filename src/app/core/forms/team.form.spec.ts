import { TeamForm } from './team.form';

describe('TeamForm', () => {
  it('should create an instance', () => {
    expect(new TeamForm()).toBeTruthy();
  });

  it('should be invalid', () => {
    const form = new TeamForm();

    expect(form.valid).toBeFalse();
  });

  it('should be valid', () => {
    const form = new TeamForm();
    form.Name.setValue('name_of_the_team');

    expect(form.valid).toBeTrue();
  });
});
