import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {OrderService} from './modules/order/order.service';
import {Subject} from 'rxjs';
import {switchMap, takeUntil} from 'rxjs/operators';
import {Currency, CurrencyService} from './services/currency.service';
import {AuthService} from './services/auth.service';
import {Role} from './models/role';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {ModalComponent} from './components/modal/modal.component';
import {ModalRefDirective} from './directives/modal-ref.directive';

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
  @ViewChild(ModalRefDirective) refDirective!: ModalRefDirective;
  Role = Role;
  Currency = Currency;
  destroyed$ = new Subject();

  ngOnInit(): void {
    this.initCurrency();
    this.authService.initCurrentUserRole().subscribe();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  logout(): void {
    this.authService.logout().then(() => {
      this.router.navigate(['/']);
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

  private initCurrency(): void {
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
