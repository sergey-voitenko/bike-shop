import {Component, OnDestroy, OnInit} from '@angular/core';
import { BikesStoreService } from '../../services/bikes-store.service';
import { Bike } from '../../interfaces/bike.interface';
import {Observable, Subject} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import {AppService} from '../../app.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy{
  bikes$!: Observable<Bike[]>;
  destroyed$ = new Subject();
  currency!: 'USD' | 'EUR' | 'GBP';
  exchangeRate = 0;

  constructor(
    private bikesStoreService: BikesStoreService,
    private appService: AppService
  ) {}

  ngOnInit(): void {
    this.getBikes();
    this.getCurrency();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private getBikes(): void {
    this.bikes$ = this.bikesStoreService.getBikes();
  }

  private getCurrency(): void {
    this.appService.getCurrency().pipe(
      takeUntil(this.destroyed$)
    ).subscribe(value => {
      this.currency = value;
      this.appService.getExchangeRate().pipe(
        takeUntil(this.destroyed$)
      ).subscribe(res => this.exchangeRate = res.rates[value]);
    });
  }
}
