import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SortByDiscountPipe} from '../pipes/sort-by-discount.pipe';
import {CharLimitationPipe} from '../pipes/char-limitation.pipe';
import {ExchangeCurrencyPipe} from '../pipes/exchange-currency.pipe';

@NgModule({
  declarations: [
    SortByDiscountPipe,
    CharLimitationPipe,
    ExchangeCurrencyPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SortByDiscountPipe,
    CharLimitationPipe,
    ExchangeCurrencyPipe,
    CommonModule
  ]
})
export class SharedModule {
}
