import { Injectable } from '@angular/core';
import {Bike} from '../../interfaces/bike.interface';

@Injectable({
  providedIn: 'root'
})
export class NewProductService {
  colors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Brown', 'Magenta', 'Tan', 'Cyan', 'Olive', 'Maroon',
            'Navy', 'Aquamarine', 'Turquoise', 'Silver', 'Lime', 'Teal', 'Indigo', 'Violet', 'Pink', 'Black', 'White',
            'Gray'];
  sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  generateId(bikes: Bike[]): number {
    let maxId = 0;
    for (const bike of bikes) {
      maxId = bike.id > maxId ? bike.id : maxId;
    }
    return maxId + 1;
  }
}
