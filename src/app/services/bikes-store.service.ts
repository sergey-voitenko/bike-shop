import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BIKES } from '../../assets/data';
import { Bike } from '../interfaces/bike.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BikesStoreService {
  getBikes(): Observable<Bike[]> {
    const bikes: Bike[] = [];
    this.bikesHandler(bikes);

    return of(bikes);
  }

  getBikeById(id: number): Observable<Bike | undefined> {
    return this.getBikes().pipe(
      map(bikes => bikes.find(bike => bike.id === id))
    );
  }

  bikesHandler(bikes: Bike[]): void {
    let maxDiscount = 0;

    for (const bike of BIKES) {
      const isDiscountEnded = new Date().getTime() > new Date(bike.discountUntil).getTime();
      let discountedPrice;

      if (isDiscountEnded) {
        discountedPrice = bike.price;
      } else {
        discountedPrice = bike.price - (bike.discount * bike.price / 100);
      }

      const newBike = {
        ...bike,
        discountedPrice
      };

      newBike.main = false;
      maxDiscount = bike.discount > maxDiscount ? bike.discount : maxDiscount;

      bikes.push(newBike);
    }

    const bikeWithMaxDiscount = bikes.find(bike => bike.discount === maxDiscount);

    if (bikeWithMaxDiscount) {
      bikeWithMaxDiscount.main = true;
    }
  }
}
