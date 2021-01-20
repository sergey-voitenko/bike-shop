import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {NewProductComponent} from '../../new-product/new-product.component';
import {BikesStoreService} from '../../../services/bikes-store.service';
import {NewProductService} from '../../new-product/new-product.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {last, switchMap, takeUntil, tap} from 'rxjs/operators';
import {FileUpload} from 'primeng/fileupload';

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

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit(): void {
    const date = Date.now();
    const filePath = `images/${date}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.imageFile);
    const currentUrl = this.router.url;
    const bikeId = currentUrl.replace('/product/', '')
      .replace('/edit', '');

    task.snapshotChanges().pipe(
      last(),
      switchMap(() => fileRef.getDownloadURL()),
      tap((url) => this.form.get('image')?.setValue(url)),
      switchMap(() => this.bikesStoreService.updateBike(bikeId, this.createNewBike())),
      takeUntil(this.destroyed$)
    ).subscribe(() => {
      this.reset();
    });
  }

}
