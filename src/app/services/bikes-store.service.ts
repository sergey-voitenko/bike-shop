import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BIKES } from '../../assets/data';
import { Bike } from '../interfaces/bike.interface';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BikesStoreService {
  getBikes(): Observable<Bike[]> {
    return of(BIKES);
  }

  getBikeById(id: number): Observable<Bike | undefined> {
    return this.getBikes().pipe(
      map(bikes => bikes.find(bike => bike.id === id))
    )
  }
}
