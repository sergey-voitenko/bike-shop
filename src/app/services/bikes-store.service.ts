import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bike } from '../interfaces/bike.interface';
import { map } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BikesStoreService {
  static url = 'https://bikes-1b310-default-rtdb.europe-west1.firebasedatabase.app/bikes.json';

  constructor(private http: HttpClient) {}

  getBikes(): Observable<Bike[]> {
    return this.http.get<Bike[]>(BikesStoreService.url).pipe(
      map(res => {
        const array: Bike[] = Object.keys(res).map((key: any) => ({...res[key], id: key}));
        this.bikesHandler(array);
        return array;
      })
    );
  }

  createBike(bike: Bike): Observable<Bike> {
    return this.http.post<Bike>(BikesStoreService.url, bike);
  }

  getBikeById(id: string): Observable<Bike | undefined> {
    return this.getBikes().pipe(
      map(bikes => bikes.find(bike => bike.id === id))
    );
  }

  bikesHandler(bikes: Bike[]): void {
    let maxDiscount = 0;

    for (const bike of bikes) {
      const isDiscountEnded = new Date().getTime() > new Date(bike.discountUntil).getTime();
      let discountedPrice;

      if (isDiscountEnded) {
        discountedPrice = bike.price;
      } else {
        discountedPrice = bike.price - (bike.discount * bike.price / 100);
      }

      bike.discountedPrice = discountedPrice;
      bike.main = false;
      maxDiscount = bike.discount > maxDiscount ? bike.discount : maxDiscount;
    }

    const bikeWithMaxDiscount = bikes.find(bike => bike.discount === maxDiscount);

    if (bikeWithMaxDiscount) {
      bikeWithMaxDiscount.main = true;
    }
  }
}
