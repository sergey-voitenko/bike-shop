import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BIKES } from '../../assets/data';
import { Bike } from '../interfaces/bike.interface';

@Injectable({
  providedIn: 'root'
})
export class BikesStoreService {
  getBikes(): Observable<Bike[]> {
    return of(BIKES);
  }
}
