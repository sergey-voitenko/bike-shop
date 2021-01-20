import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from './modules/order/order.service';
import {Subject} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import {AppService} from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private orderService: OrderService,
    private appService: AppService
  ) {}

  ordersCount = 0;
  destroyed$ = new Subject();
  currency = '';

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
    this.appService.setCurrency(currency);
  }

  private getCurrency(): void {
    this.appService.getCurrency().pipe(
      takeUntil(this.destroyed$)
    ).subscribe(value => {
      this.currency = value;
    });
  }
}
