import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {NewProductComponent} from './new-product.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    NewProductComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: NewProductComponent,
        data: {
          breadcrumb: 'New Product'
        }
      }
    ]),
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    FileUploadModule,
    HttpClientModule
  ]
})
export class NewProductModule {
}
