import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { JobTypesEnum } from '../../core/enums/job-types.enum';

@Pipe({
  name: 'jobType'
})
export class JobTypePipe implements PipeTransform {
  transform(value: any): any {
    switch (value) {
      case JobTypesEnum.DEPLOYMENT:
        return 'Deployment';
      case JobTypesEnum.JOB:
        return 'Job';
      case JobTypesEnum.SCM_PULL:
        return 'SCM pull';
      default:
        return value;
    }
  }
}

@NgModule({
  declarations: [JobTypePipe],
  exports: [JobTypePipe],
})
export class JobTypePipeModule { }
