import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ansi'
})
export class AnsiPipe implements PipeTransform {

  transform(value: string, ...args: any[]): any {
    return value
      .replace(/\u001b\[1;30m/g, '<span class="ansi-black">')
      .replace(/\u001b\[0;31m/g, '<span class="ansi-red">')
      .replace(/\u001b\[0;32m/g, '<span class="ansi-green">')
      .replace(/\u001b\[0;33m/g, '<span class="ansi-yellow">')
      .replace(/\u001b\[0;34m/g, '<span class="ansi-blue">')
      .replace(/\u001b\[0;35m/g, '<span class="ansi-magenta">')
      .replace(/\u001b\[0;36m/g, '<span class="ansi-cyan">')
      .replace(/\u001b\[0;37m/g, '<span class="ansi-white">')
      .replace(/\u001b\[0m/g, '</span>')
      ;
  }
}
