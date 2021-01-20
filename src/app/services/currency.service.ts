import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  static currency: 'USD' | 'EUR' | 'GBP';
  static exchangeRate: number;
  currency$ = new BehaviorSubject<'USD' | 'EUR' | 'GBP'>('USD');

  constructor(private http: HttpClient) {}

  setCurrency(value: 'USD' | 'EUR' | 'GBP'): void {
    this.currency$.next(value);
  }

  getCurrency(): Observable<'USD' | 'EUR' | 'GBP'> {
    return this.currency$.asObservable();
  }

  getExchangeRate(): Observable<any> {
    return this.http.get('https://api.exchangeratesapi.io/latest?base=USD');
  }

  get currency(): 'USD' | 'EUR' | 'GBP' {
    return CurrencyService.currency;
  }

  get exchangeRate(): number {
    return CurrencyService.exchangeRate;
  }
}
