import {Injectable} from '@angular/core';
import {Order} from './order.interface';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {map, startWith, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders$: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([]);
  private _orderList: Order[] = [];

  get orderList(): Order[] {
    return this._orderList;
  }

  addOrder(order: Order): void {
    const isOrderExist = this.isOrderExist(order);

    if (isOrderExist) {
      const sameOrder = this._orderList.find(orderItem => {
        return orderItem.id === order.id && orderItem.color === order.color && orderItem.size === order.size;
      });
      if (sameOrder !== undefined) {
        sameOrder.quantity += order.quantity;
      }
    } else {
      this._orderList.push(order);
    }

    console.log('add order:', order);

    this.orders$.next(this._orderList);
  }

  getOrders(): Observable<Order[]> {
    return this.orders$.asObservable();
  }

  resetOrders(): void {
    this._orderList = [];
    this.orders$.next([]);
  }

  removeOrder(order: Order): void {
    this._orderList = this._orderList.filter((orderItem) => {
      return orderItem.id !== order.id || orderItem.color !== order.color || orderItem.size !== order.size;
    });

    this.orders$.next(this._orderList);
  }

  getNumberOfOrders(): Observable<number> {
    return this.getOrders().pipe(
      startWith(this._orderList),
      map(order => order.map(item => item.quantity)),
      map((orders) => {
        if (orders[0]) {
          return orders.reduce((acc, val) => acc + val);
        } else {
          return 0;
        }
      })
    );
  }

  getTotalSum(): Observable<number> {
    return this.getOrders().pipe(
      startWith(this._orderList),
      map(orders => orders.map(order => order.price * order.quantity)),
      map(orders => orders.reduce(((acc, val) => acc + val), 0))
    );
  }


  private isOrderExist(order: Order): boolean {
    for (const orderItem of this._orderList) {
      const orderId = orderItem.id;
      const orderColor = orderItem.color;
      const orderSize = orderItem.size;

      if (order.id === orderId && (order.color === orderColor && order.size === orderSize)) {
        return true;
      }
    }
    return false;
  }
}
