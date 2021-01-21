import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {OrderService} from './modules/order/order.service';
import {Subject} from 'rxjs';
import {map, switchMap, takeUntil} from 'rxjs/operators';
import {CurrencyService} from './services/currency.service';
import {AuthService} from './services/auth.service';
import {Role} from './models/role';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {ModalComponent} from "./components/modal/modal.component";
import {RefDirective} from "./directives/ref.directive";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private orderService: OrderService,
    public currencyService: CurrencyService,
    public authService: AuthService,
    private router: Router,
    private firebaseAuth: AngularFireAuth,
    private resolver: ComponentFactoryResolver
  ) {}
  @ViewChild(RefDirective) refDirective!: RefDirective;
  Role = Role;
  ordersCount = 0;
  destroyed$ = new Subject();

  ngOnInit(): void {
    this.initOrdersCount();
    this.getCurrency();
    this.initUser();
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

  logout(): void {
    this.authService.logout().then(() => {
      this.router.navigate(['/']);
    });
  }

  initUser(): void {
    this.firebaseAuth.authState.pipe(
      switchMap(() => this.firebaseAuth.currentUser),
      takeUntil(this.destroyed$)
    ).subscribe((user) => {
      if (user?.uid === '6CHsRwmWPggFKvlBHfgCp581rgo1') {
        this.authService.setRole(Role.Admin);
      } else if (user?.uid === 'l68mmj536CP4S6LdvASdFO3SZC93') {
        this.authService.setRole(Role.Owner);
      } else {
        this.authService.setRole(Role.Customer);
      }
    });
  }

  showModal(): void {
    const modalFactory = this.resolver.resolveComponentFactory(ModalComponent);
    this.refDirective.containerRef.clear();
    const component = this.refDirective.containerRef.createComponent(modalFactory);
    component.instance.closeEvent.subscribe(() => {
      this.refDirective.containerRef.clear();
    });
  }
}
