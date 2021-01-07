import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'charLimitation'
})
export class CharLimitationPipe implements PipeTransform {

  transform(value: string, limit: number): string {
    if (value.length > limit) {
      const newString = value.substr(0, limit - 1);

      if (newString[newString.length - 1] === ' ') {
        return newString.substring(0, newString.length - 1) + '...';
      }

      return newString + '...';
    }

    return value;
  }

}
