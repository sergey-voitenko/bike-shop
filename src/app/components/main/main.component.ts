import {Component, OnDestroy, OnInit} from '@angular/core';
import { BikesStoreService } from '../../services/bikes-store.service';
import { Bike } from '../../interfaces/bike.interface';
import {Observable, Subject} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import {CurrencyService} from '../../services/currency.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy{
  bikes$!: Observable<Bike[]>;
  destroyed$ = new Subject();

  constructor(
    private bikesStoreService: BikesStoreService,
    public currencyService: CurrencyService
  ) {}

  ngOnInit(): void {
    this.getBikes();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private getBikes(): void {
    this.bikes$ = this.bikesStoreService.getBikes();
  }
}
