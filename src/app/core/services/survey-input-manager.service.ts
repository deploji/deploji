import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SurveyInput } from '../interfaces/survey-input';
import { Survey } from '../interfaces/survey';

@Injectable({
  providedIn: 'root'
})
export class SurveyInputManagerService {

  private subject: BehaviorSubject<string>;
  public inputSource: Observable<string>;

  constructor() {
    this.subject = new BehaviorSubject(null);
    this.inputSource = this.subject.asObservable();
  }

  get lastValue() {
    return this.subject.getValue();
  }

  public send(survey, value): void {
    this.subject.next(this.transform(survey, value));
  }

  private transform(survey: Survey, values: any): string {
    let result = '';

    survey.Inputs.forEach((input: SurveyInput, index: number) => {
      if (values[index]) {
        result += `${input.VariableName}:${values[index]}\n`;
      }
    });

    return result;
  }
}
