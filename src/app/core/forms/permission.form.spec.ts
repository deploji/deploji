import { PermissionForm } from './permission.form';
import { ObjectTypesEnum } from '../enums/object-types.enum';
import { SubjectTypesEnum } from '../enums/subject-types.enum';
import { Permission } from '../interfaces/permission';

describe('PermissionForm', () => {
  it('should create an instance', () => {
    expect(new PermissionForm()).toBeTruthy();
  });

  it('should be invalid', () => {
    const form = new PermissionForm();

    expect(form.valid).toBeFalse();
  });

  it('should be valid', () => {
    const form = new PermissionForm();

    expect(form.valid).toBeFalse();
  });

  it('should reset subject', () => {
    const form = new PermissionForm();
    form.Object.setValue('foo');
    form.ObjectType.setValue(ObjectTypesEnum.APPLICATION);

    expect(form.Object.value).toBeFalsy();
  });

  it('should reset object', () => {
    const form = new PermissionForm();
    form.Subject.setValue('foo');
    form.SubjectType.setValue(SubjectTypesEnum.USERS);

    expect(form.valid).toBeFalse();
  });

  it('should return permissions', () => {
    const form = new PermissionForm();
    form.Subject.setValue({ID: 'foo'});
    form.Object.setValue({ID: 'bar'});
    const value: Permission = form.getValue();

    expect(value.ObjectID).toBeDefined();
    expect(value.SubjectID).toBeDefined();
  });
});
