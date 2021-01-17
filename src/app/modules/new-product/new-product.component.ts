import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Bike} from '../../interfaces/bike.interface';
import {BikesStoreService} from '../../services/bikes-store.service';
import {NewProductService} from './new-product.service';
import {FileUpload} from 'primeng/fileupload';
import {Observable, Subject} from 'rxjs';
import {finalize, takeUntil} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  destroyed$ = new Subject();
  downloadUrl!: Observable<string>;
  uploadPercent!: Observable<number | undefined>;
  progressBar = false;
  @ViewChild('fileUpload') fileUpload!: FileUpload;

  constructor(
    private bikesStoreService: BikesStoreService,
    private newProductService: NewProductService,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private initForm(): void {
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
    ).subscribe(() => {
      this.form.reset();
      this.fileUpload.clear();
    });
  }

  addToFormArray(value: string, property: AbstractControl, element: HTMLSelectElement): void {
    if (value.trim() && !property.value.find((v: string) => v === value)) {
      const array = property as FormArray;
      array.push(new FormControl(value));
      element.value = '';
    }
  }

  uploadHandler(event: any): void {
    if (event.files) {
      const date = Date.now();
      const file = event.files[0];
      const filePath = `images/${date}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
      this.progressBar = true;
      this.uploadPercent = task.percentageChanges();

      task.snapshotChanges().pipe(
        takeUntil(this.destroyed$),
        finalize(() => {
          this.downloadUrl = fileRef.getDownloadURL();
          this.downloadUrl.pipe(
            takeUntil(this.destroyed$)
          ).subscribe(url => {
            if (url) {
              this.form.get('image')?.setValue(url);
            }
          });
        })
      ).subscribe();
    }
  }

  clearHandler(): void {
    this.form.get('image')?.reset();
    this.progressBar = false;
  }

  getColors(): string[] {
    return this.newProductService.colors;
  }

  getSizes(): string[] {
    return this.newProductService.sizes;
  }
}
