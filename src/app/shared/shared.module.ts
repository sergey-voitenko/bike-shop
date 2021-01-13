import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SortByDiscountPipe} from '../pipes/sort-by-discount.pipe';
import {CharLimitationPipe} from '../pipes/char-limitation.pipe';

@NgModule({
  declarations: [
    SortByDiscountPipe,
    CharLimitationPipe
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SortByDiscountPipe,
    CharLimitationPipe
  ]
})
export class SharedModule {
}
