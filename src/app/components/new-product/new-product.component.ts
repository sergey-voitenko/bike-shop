import {Component, OnDestroy, OnInit} from '@angular/core';
import {BIKES} from '../../../assets/data';
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Bike} from '../../interfaces/bike.interface';
import {Subscription} from 'rxjs';
import {BikesStoreService} from '../../services/bikes-store.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  colors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Brown', 'Magenta', 'Tan', 'Cyan', 'Olive', 'Maroon',
            'Navy', 'Aquamarine', 'Turquoise', 'Silver', 'Lime', 'Teal', 'Indigo', 'Violet', 'Pink', 'Black', 'White',
            'Gray'];
  sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  bikesSubscription!: Subscription;
  uploadedImage!: File;

  constructor(private bikesStoreService: BikesStoreService) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    if (this.bikesSubscription) {
      this.bikesSubscription.unsubscribe();
    }
  }

  initForm(): void {
    this.form = new FormGroup({
      image: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
      discount: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
      shop: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      shipping: new FormControl(''),
      discountUntil: new FormControl('', Validators.required),
      new: new FormControl('', Validators.required),
      color: new FormArray([], Validators.required),
      size: new FormArray([], Validators.required),
    });
  }

  addToFormArray(value: string, property: AbstractControl, element: HTMLSelectElement): void {
    if (value.trim() && !property.value.find((v: string) => v === value)) {
      const array = property as FormArray;
      array.push(new FormControl(value));
      element.value = '';
    }
  }

  onSubmit(): void {
    console.log(this.form);

    const newBike: Bike = {
      id: 0,
      name: this.form.value.name,
      price: +this.form.value.price,
      discount: +this.form.value.discount,
      shop: this.form.value.shop,
      description: this.form.value.description,
      shipping: this.form.value.shipping,
      discountUntil: this.form.value.discountUntil,
      new: this.form.value.new === 'new',
      color: this.form.value.color,
      size: this.form.value.size,
      imgUrl: this.form.value.image,
      review: []
    };
    this.bikesSubscription = this.bikesStoreService.getBikes().subscribe(bikes => {
      newBike.id = this.generateId(bikes);
    });
    BIKES.push(newBike);
    console.log(newBike);
  }

  generateId(bikes: Bike[]): number {
    let maxId = 0;
    for (const bike of bikes) {
      maxId = bike.id > maxId ? bike.id : maxId;
    }
    return maxId + 1;
  }

  uploadHandler(event: any): void {
    if (event.files) {
      this.uploadedImage = event.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = (readerEvent) => {
        if (readerEvent.target && readerEvent.target.result) {
          this.form.get('image')?.setValue(readerEvent.target.result.toString());
        }
      };
    }
  }
}
