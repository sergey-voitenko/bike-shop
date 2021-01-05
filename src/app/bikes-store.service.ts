import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Bike } from './main/main.component';

@Injectable({
  providedIn: 'root'
})
export class BikesStoreService {
  private readonly _bikes = new BehaviorSubject<Bike[]>([]);
  readonly bikes$ = this._bikes.asObservable();

  get bikes(): Bike[] {
    return this._bikes.getValue();
  }

  set bikes(value: Bike[]) {
    this._bikes.next(value);
  }

  addBike(dataBike: Bike): void {
    this.bikes = [...this.bikes, dataBike]
  }

  filterByDiscount(discount: 70 | 60 | 50, limit: number): Bike[] {
    let newArray!: Bike[];
    let limitedArray: Bike[] = [];

    if (discount < 70) {
      newArray = this.bikes.filter(b => b.discount >= discount && b.discount < discount + 10);
    } else {
      newArray = this.bikes.filter(b => b.discount >= discount);
    }

    for (let i = 0; i < limit; i++) {
      limitedArray.push(newArray[i]);
    }

    return limitedArray;
  }
}
