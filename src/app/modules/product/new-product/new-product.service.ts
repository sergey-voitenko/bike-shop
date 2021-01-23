import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewProductService {
  colors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Brown', 'Magenta', 'Tan', 'Cyan', 'Olive', 'Maroon',
            'Navy', 'Aquamarine', 'Turquoise', 'Silver', 'Lime', 'Teal', 'Indigo', 'Violet', 'Pink', 'Black', 'White',
            'Gray'];
  sizes = ['S', 'M', 'L', 'XL', 'XXL'];
}
