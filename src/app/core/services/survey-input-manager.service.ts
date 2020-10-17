import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SurveyInput } from '../interfaces/survey-input';
import { Survey } from '../interfaces/survey';

@Injectable({
  providedIn: 'root'
})
export class SurveyInputManagerService {

  private subject: Subject<string>;
  public inputSource: Observable<string>;

  constructor() {
    this.subject = new Subject();
    this.inputSource = this.subject.asObservable();
  }

  public send(survey: Survey, value: string[]): void {
    this.subject.next(this.transform(survey, value));
  }

  public parseOptions(options: string): string[] {
    return options.replace(/\s/g, ',')
                  .replace(/;/g, ',')
                  .split(',');
  }

  private transform(survey: Survey, values: string[]): string {
    let result = '';

    survey.Inputs.forEach((input: SurveyInput, index: number) => {
      if (values[index]) {
        result += `${input.VariableName}: ${values[index]}\n`;
      }
    });

    return result;
  }
}
