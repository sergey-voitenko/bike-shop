import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from './modules/order/order.service';
import {Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  ordersCount = 0;
  orderSubscription!: Subscription;
  faShoppingCart = faShoppingCart;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.initOrdersCount();
  }

  ngOnDestroy(): void {
    this.orderSubscription.unsubscribe();
  }

  initOrdersCount(): void {
    this.orderSubscription = this.orderService.getOrders().pipe(
      map(order => order.map(item => item.quantity))
    ).subscribe(orders => {
      if (orders[0]) {
        this.ordersCount = orders.reduce((acc, val) => acc + val);
      } else {
        this.ordersCount = 0;
      }
    });
  }
}
