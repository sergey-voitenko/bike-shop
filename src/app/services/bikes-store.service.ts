import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bike } from '../interfaces/bike.interface';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AngularFireStorage} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class BikesStoreService {
  static url = environment.firebaseConfig.databaseURL;

  constructor(
    private http: HttpClient,
    private storage: AngularFireStorage
  ) {}

  getBikes(): Observable<Bike[]> {
    return this.http.get<Bike[]>(`${BikesStoreService.url}/bikes.json`).pipe(
      map(res => {
        const array: Bike[] = Object.keys(res).map((key: any) => ({...res[key], id: key}));
        this.bikesHandler(array);
        return array;
      })
    );
  }

  createBike(bike: Bike): Observable<Bike> {
    return this.http.post<Bike>(`${BikesStoreService.url}/bikes.json`, bike);
  }

  updateBike(bikeId: string, bike: Bike): Observable<Bike> {
    return this.http.put<Bike>(`${BikesStoreService.url}/bikes/${bikeId}.json`, bike);
  }

  updateBikes(newBikesArray: Bike[]): Observable<Bike[]> {
    return this.http.put<Bike[]>(`${BikesStoreService.url}/bikes.json`, newBikesArray);
  }

  deleteFromStorage(url: string): Promise<any> {
    return this.storage.storage.refFromURL(url).delete();
  }

  getBikeById(id: string): Observable<Bike | undefined> {
    return this.getBikes().pipe(
      map(bikes => bikes.find(bike => bike.id === id))
    );
  }

  private bikesHandler(bikes: Bike[]): void {
    let maxDiscount = 0;

    for (const bike of bikes) {
      const isDiscountEnded = new Date().getTime() > new Date(bike.discountUntil).getTime();
      let discountedPrice;

      if (isDiscountEnded) {
        discountedPrice = bike.price;
      } else {
        discountedPrice = bike.price - (bike.discount * bike.price / 100);
      }

      const bikeDiscountUntilDate = new Date(bike.discountUntil);
      const dateYear = bikeDiscountUntilDate.getFullYear();
      const dateMonth = bikeDiscountUntilDate.getMonth() + 1;
      const dateDay = bikeDiscountUntilDate.getDate();
      bike.discountUntil = dateYear + '-';
      bike.discountUntil += (dateMonth < 10 ? `0${dateMonth}` : dateMonth) + '-';
      bike.discountUntil += (dateDay < 10 ? `0${dateDay}` : dateDay) + '';
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
