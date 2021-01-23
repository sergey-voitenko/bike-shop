import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {OrderService} from '../modules/order/order.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartGuard implements CanActivate {
  constructor(
    private orderService: OrderService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.orderService.getOrders().pipe(
      map(orders => {
        if (orders.length) {
          return true;
        } else  {
          this.router.navigate(['/']);
          return false;
        }
      })
    );
  }
}
