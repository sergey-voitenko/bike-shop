import {Component, ElementRef, ViewChildren} from '@angular/core';
import {OrderService} from '../../modules/order/order.service';
import {CurrencyService} from '../../services/currency.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  constructor(
    public orderService: OrderService,
    public currencyService: CurrencyService
  ) {}

  @ViewChildren('quantityInput') quantityInputs!: ElementRef[];

  updateOrders(): void {
    const inputValues = this.quantityInputs.map(input => +input.nativeElement.value);
    this.orderService.updateOrders(inputValues);
  }
}
