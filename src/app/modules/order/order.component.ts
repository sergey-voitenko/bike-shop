import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OrderService} from './order.service';
import {Order} from './order.interface';
import {Bike} from '../../interfaces/bike.interface';
import {BikesStoreService} from '../../services/bikes-store.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  form!: FormGroup;
  currentStep = 1;
  orderList!: Order[];
  bikes$!: Observable<Bike[]>;
  sum = 0;

  constructor(
    private orderService: OrderService,
    private bikesStoreService: BikesStoreService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.initCurrentStep();
    this.initBikes();
    this.calculateSum();
    this.initForm();
  }

  private initBikes(): void {
    this.bikes$ = this.bikesStoreService.getBikes();
  }

  private initCurrentStep(): void {
    this.orderList = this.orderService.orderList;
    this.currentStep = this.orderList.length > 0 ? 2 : 1;
  }

  private initForm(): void {
    this.form = new FormGroup({
      address: new FormGroup({
        country: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required]),
        street: new FormControl('', [Validators.required]),
      }),
      payment: new FormGroup({
        method: new FormControl('', [Validators.required])
      }),
      delivery: new FormGroup({
        date: new FormControl('', [Validators.required]),
        chosen: new FormControl('')
      })
    });
  }

  incrementSteps(): void {
    this.currentStep++;
  }

  decrementSteps(): void {
    this.currentStep--;
  }

  private calculateSum(): void {
    for (const order of this.orderList) {
      this.sum += order.price * order.quantity;
    }
  }

  order(): void {
    const submittedOrder = {};
    this.orderService.resetOrders();
    this.router.navigate(['order/success']);
  }
}


