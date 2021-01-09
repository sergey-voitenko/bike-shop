import { Component, Input } from '@angular/core';
import { Bike } from '../../interfaces/bike.interface';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() bike!: Bike;
}
