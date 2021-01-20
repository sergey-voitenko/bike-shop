import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {BikesStoreService} from '../../services/bikes-store.service';
import {Bike} from '../../interfaces/bike.interface';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {map, switchMap, takeUntil} from 'rxjs/operators';
import {Order} from '../order/order.interface';
import {OrderService} from '../order/order.service';
import {CurrencyService} from '../../services/currency.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  bike!: Bike;
  averageOfRating!: number;
  form!: FormGroup;
  descriptionToggle = false;
  destroyed$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bikeStoreService: BikesStoreService,
    private orderService: OrderService,
    public currencyService: CurrencyService,
  ) {}

  ngOnInit(): void {
    this.initBikeByParam();
    this.initFormGroup();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private initBikeByParam(): void {
    this.route.params.pipe(
      takeUntil(this.destroyed$),
      switchMap((params: Params) => {
        return this.bikeStoreService.getBikeById(params.id);
      })
    ).subscribe((bike: Bike | undefined) => {
      if (bike) {
        this.bike = bike;
        this.calculateRating();
      }
    });
  }

  private calculateRating(): void {
    if (this.bike.review) {
      const sumOfRatings = this.bike.review.reduce((acc, review) => acc + review.rating, 0);
      this.averageOfRating = sumOfRatings / this.bike.review.length;
    }
  }

  private initFormGroup(): void {
    this.form = new FormGroup({
      color: new FormControl('', Validators.required),
      size: new FormControl('', Validators.required),
      quantity: new FormControl(1, Validators.required)
    });
  }

  submit(): void {
    const newOrder: Order = {
      id: this.bike.id,
      name: this.bike.name,
      price: this.bike.discountedPrice,
      discountUntil: this.bike.discountUntil,
      imgUrl: this.bike.imgUrl,
      ...this.form.value
    };
    this.orderService.addOrder(newOrder);
  }

  onDelete(): void {
    this.bikeStoreService.getBikes()
      .pipe(
        map(bikes => bikes.filter(bike => bike.id !== this.bike.id)),
        switchMap(bikes => {
          return this.bikeStoreService.updateBikes(bikes);
        }),
        takeUntil(this.destroyed$)
      ).subscribe(() => {
        this.router.navigate(['/']);
      });
  }
}
