import { Pipe, PipeTransform } from '@angular/core';
import { Bike } from '../interfaces/bike.interface';

@Pipe({
  name: 'sortByDiscount'
})
export class SortByDiscountPipe implements PipeTransform {

  transform(bikes: Bike[] | null): Bike[] | null {
    if (bikes) {
      bikes.sort((a, b) => {
        if (b.discount < a.discount) { return -1; }
        return b.discount > a.discount ? 1 : 0;
      });
    }

    return bikes;
  }

}
