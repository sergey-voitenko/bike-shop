import { Component, Input } from '@angular/core';
import { Bike } from '../../interfaces/bike.interface';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() bike!: Bike;
}
