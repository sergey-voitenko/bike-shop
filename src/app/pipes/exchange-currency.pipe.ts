import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'exchangeCurrency'
})
export class ExchangeCurrencyPipe implements PipeTransform {
  transform(value: number | undefined, exchangeRate: number): number | undefined {
    if (value) {
      return value * exchangeRate;
    }

    return value;
  }
}
