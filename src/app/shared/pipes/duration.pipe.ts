import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(milliseconds: any, ...args: any[]): any {
    const seconds = Math.round(((milliseconds / 1000) % 60) * 100) / 100;
    const minutes = Math.floor(((milliseconds / (1000 * 60)) % 60));
    const hours   = Math.floor(((milliseconds / (1000 * 60 * 60)) % 24));
    return `${hours > 0 ? hours + ' hours ' : ''}${minutes > 0 ? minutes + ' minutes ' : ''}${seconds > 0 ? seconds + ' seconds ' : ''}`;
  }
}
