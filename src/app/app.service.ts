import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  currency$ = new BehaviorSubject<'USD' | 'EUR' | 'GBP'>('USD');

  setCurrency(value: 'USD' | 'EUR' | 'GBP'): void {
    this.currency$.next(value);
  }

  getCurrency(): Observable<'USD' | 'EUR' | 'GBP'> {
    return this.currency$.asObservable();
  }

  getExchangeRate(): Observable<any> {
    return this.http.get('https://api.exchangeratesapi.io/latest?base=USD');
  }

  constructor(private http: HttpClient) {}
}
