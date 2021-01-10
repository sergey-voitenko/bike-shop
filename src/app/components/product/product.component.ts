import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {BikesStoreService} from "../../services/bikes-store.service";
import {Bike} from "../../interfaces/bike.interface";
import {FormControl, FormGroup} from "@angular/forms";
import {faMagic, faShoppingCart} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  bike!: Bike;
  averageOfRating!: number;
  form!: FormGroup;
  descriptionToggle = false;
  faMagic = faMagic;
  faShoppingCart = faShoppingCart;

  constructor(
    private route: ActivatedRoute,
    private bikeStoreService: BikesStoreService
  ) {}

  ngOnInit(): void {
    this.initBikeByParam();
    this.calculateRating();
    this.initFormGroup();
  }

  initBikeByParam(): void {
    this.route.params.subscribe((params: Params) => {
      this.bike = this.bikeStoreService.getBikeById(+params.id);
    }).unsubscribe();
  }

  calculateRating(): void {
    const sumOfRatings = this.bike.review.reduce((acc, review) => acc + review.rating, 0);
    this.averageOfRating = sumOfRatings / this.bike.review.length;
  }

  initFormGroup(): void {
    this.form = new FormGroup({
      color: new FormControl('default'),
      size: new FormControl('default'),
      quantity: new FormControl('')
    })
  }
}
