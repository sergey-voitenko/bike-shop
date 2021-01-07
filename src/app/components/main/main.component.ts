import { Component, OnInit } from '@angular/core';
import { BikesStoreService } from '../../services/bikes-store.service';
import { Bike } from '../../interfaces/bike.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  bikes!: Bike[];

  constructor(private bikesStoreService: BikesStoreService) { }

  ngOnInit(): void {
    this.getBikes();
  }

  getBikes(): void {
    this.bikesStoreService.getBikes().subscribe(bikes => this.bikes = bikes);
  }
}
