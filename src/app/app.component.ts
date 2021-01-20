import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from './modules/order/order.service';
import {Subject} from 'rxjs';
import {map, switchMap, takeUntil} from 'rxjs/operators';
import {CurrencyService} from './services/currency.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private orderService: OrderService,
    public currencyService: CurrencyService
  ) {}

  ordersCount = 0;
  destroyed$ = new Subject();

  ngOnInit(): void {
    this.initOrdersCount();
    this.getCurrency();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private initOrdersCount(): void {
    this.orderService.getOrders().pipe(
      takeUntil(this.destroyed$),
      map(order => order.map(item => item.quantity))
    ).subscribe(orders => {
      if (orders[0]) {
        this.ordersCount = orders.reduce((acc, val) => acc + val);
      } else {
        this.ordersCount = 0;
      }
    });
  }

  setCurrency(currency: 'USD' | 'EUR' | 'GBP'): void {
    this.currencyService.setCurrency(currency);
  }

  private getCurrency(): void {
    this.currencyService.getCurrency().pipe(
      switchMap((currency) => {
        CurrencyService.currency = currency;
        return this.currencyService.getExchangeRate();
      }),
      takeUntil(this.destroyed$)
    ).subscribe(res => {
      CurrencyService.exchangeRate = res.rates[CurrencyService.currency];
    });
  }
}
