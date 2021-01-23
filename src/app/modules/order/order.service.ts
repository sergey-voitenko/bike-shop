import {Injectable} from '@angular/core';
import {Order} from './order.interface';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderList: Order[] = JSON.parse(localStorage.getItem('orders') as string);
  private orders$: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>(this.orderList);

  addOrder(order: Order): void {
    const isOrderExist = this.isOrderExist(order);

    if (isOrderExist) {
      const sameOrder = this.getSameOrder(order);
      if (sameOrder !== undefined) {
        sameOrder.quantity += order.quantity;
      }
    } else {
      this.orderList.push(order);
    }

    this.updateLocalStorage();
    this.orders$.next(this.orderList);
  }

  getOrders(): Observable<Order[]> {
    return this.orders$.asObservable();
  }

  resetOrders(): void {
    this.orderList = [];
    this.updateLocalStorage();
    this.orders$.next([]);
  }

  removeOrder(order: Order): void {
    this.orderList = (JSON.parse(localStorage.getItem('orders') as string) as Order[])
      .filter((orderItem) => {
        return orderItem.id !== order.id || orderItem.color !== order.color || orderItem.size !== order.size;
      });

    this.updateLocalStorage();
    this.orders$.next(this.orderList);
  }

  getNumberOfOrders(): Observable<number> {
    return this.getOrders().pipe(
      startWith(this.orderList),
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
      startWith(this.orderList),
      map(orders => orders.map(order => order.price * order.quantity)),
      map(orders => orders.reduce(((acc, val) => acc + val), 0))
    );
  }

  private isOrderExist(order: Order): boolean {
    for (const orderItem of this.orderList) {
      const orderId = orderItem.id;
      const orderColor = orderItem.color;
      const orderSize = orderItem.size;

      if (order.id === orderId && (order.color === orderColor && order.size === orderSize)) {
        return true;
      }
    }
    return false;
  }

  private getSameOrder(order: Order): Order | undefined {
    return this.orderList.find(orderItem => {
      return orderItem.id === order.id && orderItem.color === order.color && orderItem.size === order.size;
    });
  }

  updateOrders(quantities: number[]): void {
    for (let i = 0; i < this.orderList.length; i++) {
      if (quantities[i] <= 0) {
        this.removeOrder(this.orderList[i]);
      } else  {
        this.orderList[i].quantity = quantities[i];
      }
    }

    this.updateLocalStorage();
    this.orders$.next(this.orderList);
  }

  updateLocalStorage(): void {
    localStorage.setItem('orders', JSON.stringify(this.orderList));
  }
}
