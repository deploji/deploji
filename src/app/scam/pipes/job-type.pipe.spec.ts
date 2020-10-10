import { JobTypePipe } from './job-type.pipe';
import { JobTypesEnum } from '../../core/enums/job-types.enum';

describe('JobTypePipe', () => {
  it('create an instance', () => {
    const pipe = new JobTypePipe();
    expect(pipe).toBeTruthy();
  });

  it('should turn type into job type', () => {
    const pipe = new JobTypePipe();
    let transformed = null;

    transformed = pipe.transform(JobTypesEnum.DEPLOYMENT);
    expect(transformed).toEqual('Deployment');

    transformed = pipe.transform(JobTypesEnum.JOB);
    expect(transformed).toEqual('Job');

    transformed = pipe.transform(JobTypesEnum.SCM_PULL);
    expect(transformed).toEqual('SCM pull');
  });

  it('should return default value', () => {
    const pipe = new JobTypePipe();
    const transformed = pipe.transform('loremipsumdolorsitamet');
    expect(transformed).toEqual('loremipsumdolorsitamet');
  });
});
