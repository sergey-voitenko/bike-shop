import {Injectable} from '@angular/core';
import {Order} from '../interfaces/order.interface';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orderList: Order[] = [];
  private orders$: Subject<Order[]> = new Subject<Order[]>();

  addOrder(order: Order): void {
    const isOrderExist = this.isOrderExist(order);

    if (isOrderExist) {
      const sameOrder = this.orderList.find(orderItem => {
        return orderItem.id === order.id && orderItem.color === order.color && orderItem.size === order.size;
      });
      if (sameOrder !== undefined) {
        sameOrder.quantity += order.quantity;
      }
    } else {
      this.orderList.push(order);
    }

    this.orders$.next(this.orderList);
  }

  getOrders(): Observable<Order[]> {
    return this.orders$.asObservable();
  }

  isOrderExist(order: Order): boolean {
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
}
