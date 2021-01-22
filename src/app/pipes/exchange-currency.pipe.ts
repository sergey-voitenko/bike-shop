import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'exchangeCurrency'
})
export class ExchangeCurrencyPipe implements PipeTransform {
  transform(value: number | undefined | null, exchangeRate: number): number | undefined | null {
    if (value) {
      return value * exchangeRate;
    }

    return value;
  }
}
