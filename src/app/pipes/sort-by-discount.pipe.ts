import { Pipe, PipeTransform } from '@angular/core';
import { Bike } from '../interfaces/bike.interface';

@Pipe({
  name: 'sortByDiscount'
})
export class SortByDiscountPipe implements PipeTransform {

  transform(bikes: Bike[]): Bike[] {
    for (let i = 0; i < bikes.length - 1; i++) {
      const currentBikeDiscount = bikes[i].discount;

      for (let j = i; j < bikes.length - 1; j++) {
        const nextBikeDiscount = bikes[j + 1].discount;

        if (nextBikeDiscount > currentBikeDiscount) {
          const temp: Bike = bikes[i];
          bikes[i] = bikes[j + 1];
          bikes[j + 1] = temp;
        }
      }
    }

    return bikes;
  }

}
