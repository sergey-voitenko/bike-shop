import { Component, OnInit } from '@angular/core';
import {Bike} from "../../interfaces/bike.interface";
import {ActivatedRoute, Params} from "@angular/router";
import {BikesStoreService} from "../../services/bikes-store.service";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  bike!: Bike;

  constructor(
    private route: ActivatedRoute,
    private bikeStoreService: BikesStoreService
  ) {}

  ngOnInit(): void {
    this.initBikeByParam();
  }

  initBikeByParam(): void {
    this.route.params.subscribe((params: Params) => {
      this.bike = this.bikeStoreService.getBikeById(+params.id);
    }).unsubscribe();
  }
}
