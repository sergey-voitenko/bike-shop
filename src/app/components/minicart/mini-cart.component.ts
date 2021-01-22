import {Component} from '@angular/core';
import {OrderService} from '../../modules/order/order.service';
import {CurrencyService} from '../../services/currency.service';

@Component({
  selector: 'app-minicart',
  templateUrl: './mini-cart.component.html',
  styleUrls: ['./mini-cart.component.scss']
})
export class MiniCartComponent {
  constructor(
    public orderService: OrderService,
    public currencyService: CurrencyService
  ) {}
}
