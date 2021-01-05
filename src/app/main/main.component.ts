import { Component, OnInit } from '@angular/core';
import { BikesStoreService } from '../bikes-store.service';
import { data } from '../../assets/data';

export interface Bike {
  id: number;
  imgUrl: string;
  price: number;
  discount: number;
  main: boolean;
  shop: string;
  name: string;
  description: string;
  shipping: string | null;
  discountUntil: string;
  new: boolean;
  color: string[];
  size: string[];
  review: {}[];
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  productBigBike!: Bike[];
  productSmallTopBikes!: Bike[];
  productSmallBottomBikes!: Bike[];

  constructor(public bikesStoreService: BikesStoreService) { }

  ngOnInit(): void {
    for (let dataItem of data) {
      const newBike: Bike = {
        id: dataItem.id,
        imgUrl: dataItem.imgUrl,
        price: dataItem.price,
        discount: dataItem.discount,
        main: dataItem.main,
        shop: dataItem.shop,
        name: dataItem.name,
        description: dataItem.description,
        shipping: dataItem.shipping,
        discountUntil: dataItem.discountUntil,
        new: dataItem.new,
        color: dataItem.color,
        size: dataItem.size,
        review: dataItem.review,
      }
      this.bikesStoreService.addBike(newBike);
    }

    this.productBigBike = this.bikesStoreService.filterByDiscount(70, 1);
    this.productSmallTopBikes = this.bikesStoreService.filterByDiscount(60, 2);
    this.productSmallBottomBikes = this.bikesStoreService.filterByDiscount(50, 2);
  }

}
