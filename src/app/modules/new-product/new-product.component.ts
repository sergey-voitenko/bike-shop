import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Bike} from '../../interfaces/bike.interface';
import {BikesStoreService} from '../../services/bikes-store.service';
import {NewProductService} from './new-product.service';
import {FileUpload} from 'primeng/fileupload';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  uploadedImage!: File;
  destroyed$ = new Subject();
  @ViewChild('fileUpload') fileUpload!: FileUpload;

  constructor(
    private bikesStoreService: BikesStoreService,
    private newProductService: NewProductService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
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

  onSubmit(): void {
    const newBike: Bike = {
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
    };

    this.bikesStoreService.createBike(newBike).pipe(
      takeUntil(this.destroyed$)
    ).subscribe();

    this.form.reset();
    this.fileUpload.clear();
  }

  addToFormArray(value: string, property: AbstractControl, element: HTMLSelectElement): void {
    if (value.trim() && !property.value.find((v: string) => v === value)) {
      const array = property as FormArray;
      array.push(new FormControl(value));
      element.value = '';
    }
  }

  uploadHandler(event: any): void {
    console.log('Before:', this.form.get('image'));
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

  clearHandler(): void {
    this.form.get('image')?.reset();
  }

  getColors(): string[] {
    return this.newProductService.colors;
  }

  getSizes(): string[] {
    return this.newProductService.sizes;
  }
}
