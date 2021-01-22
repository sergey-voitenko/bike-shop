import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP'
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  static currency: Currency;
  static exchangeRate: number;
  currency$ = new BehaviorSubject<Currency>(Currency.USD);

  constructor(private http: HttpClient) {}

  setCurrency(value: Currency): void {
    this.currency$.next(value);
  }

  getCurrency(): Observable<Currency> {
    return this.currency$.asObservable();
  }

  getExchangeRate(): Observable<any> {
    return this.http.get('https://api.exchangeratesapi.io/latest?base=USD');
  }

  get currency(): Currency {
    return CurrencyService.currency;
  }

  get exchangeRate(): number {
    return CurrencyService.exchangeRate;
  }
}
