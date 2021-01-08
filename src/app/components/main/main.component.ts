import { Component, OnInit } from '@angular/core';
import { BikesStoreService } from '../../services/bikes-store.service';
import { Bike } from '../../interfaces/bike.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{
  bikes$!: Observable<Bike[] | null>;

  constructor(private bikesStoreService: BikesStoreService) { }

  ngOnInit(): void {
    this.getBikes();
  }

  getBikes(): void {
    this.bikes$ = this.bikesStoreService.getBikes();
  }
}
