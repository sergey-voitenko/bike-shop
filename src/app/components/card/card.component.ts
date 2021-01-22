import {Component, Input} from '@angular/core';
import { Bike } from '../../interfaces/bike.interface';
import {Currency} from '../../services/currency.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() currency!: Currency;
  @Input() exchangeRate!: number;
  @Input() bike!: Bike;
}
