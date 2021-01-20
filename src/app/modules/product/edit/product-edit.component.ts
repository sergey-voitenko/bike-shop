import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {NewProductComponent} from '../../new-product/new-product.component';
import {BikesStoreService} from '../../../services/bikes-store.service';
import {NewProductService} from '../../new-product/new-product.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {last, switchMap, takeUntil, tap} from 'rxjs/operators';
import {FileUpload} from 'primeng/fileupload';
import {Bike} from '../../../interfaces/bike.interface';
import {FormArray, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent extends NewProductComponent implements OnInit {
  constructor(
    private router: Router,
    bikesStoreService: BikesStoreService,
    newProductService: NewProductService,
    storage: AngularFireStorage
  ) {
    super(bikesStoreService, newProductService, storage);
  }

  @ViewChild('fileUpload') fileUpload!: FileUpload;
  bike!: Bike;
  bikeId = '';
  form!: FormGroup;

  ngOnInit(): void {
    this.initForm();
    this.initBike();
  }

  onSubmit(): void {
    const date = Date.now();
    const filePath = `images/${date}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.imageFile);

    task.snapshotChanges().pipe(
      last(),
      switchMap(() => fileRef.getDownloadURL()),
      tap((url) => this.form.get('image')?.setValue(url)),
      switchMap(() => this.bikesStoreService.updateBike(this.bikeId, this.createNewBike())),
      switchMap(() => this.bikesStoreService.deleteFromStorage(this.bike.imgUrl)),
      takeUntil(this.destroyed$)
    ).subscribe(() => {
      this.reset();
    });
  }

  initBike(): void {
    const currentUrl = this.router.url;
    this.bikeId = currentUrl.replace('/product/', '')
      .replace('/edit', '');
    this.bikesStoreService.getBikeById(this.bikeId).pipe(
      takeUntil(this.destroyed$)
    ).subscribe(bike => {
      if (bike) {
        this.bike = bike;
      }

      this.setFormValues();
    });
  }

  setFormValues(): void {
    this.form.get('image')?.setValue(this.bike.imgUrl);
    this.form.get('name')?.setValue(this.bike.name);
    this.form.get('price')?.setValue(this.bike.price);
    this.form.get('discount')?.setValue(this.bike.discount);
    this.form.get('shop')?.setValue(this.bike.shop);
    this.form.get('description')?.setValue(this.bike.description);
    this.form.get('shipping')?.setValue(this.bike.shipping);
    this.form.get('discountUntil')?.setValue(this.bike.discountUntil);
    this.form.get('new')?.setValue(this.bike.new);
    this.setFormArray(this.form.get('color') as FormArray, this.bike.color);
    this.setFormArray(this.form.get('size') as FormArray, this.bike.size);

    console.log(this.form);
  }

  setFormArray(formArray: FormArray, sourceArray: string[]): void {
    sourceArray.forEach(value => {
      const control = new FormControl(value);
      formArray.push(control);
    });
  }
}
