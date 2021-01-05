import { Component, Input } from '@angular/core';
import { Bike } from '../main.component';

@Component({
  selector: 'app-product-small',
  templateUrl: './product-small.component.html',
  styleUrls: ['./product-small.component.scss']
})
export class ProductSmallComponent {
  @Input() bike!: Bike;
}
