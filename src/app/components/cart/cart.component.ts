import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../modules/order/order.service';
import {CurrencyService} from '../../services/currency.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  constructor(
    public orderService: OrderService,
    public currencyService: CurrencyService
  ) {}

  ngOnInit(): void {
  }

}
