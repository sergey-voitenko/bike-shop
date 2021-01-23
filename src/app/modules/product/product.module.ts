import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {ProductComponent} from './product.component';
import {EditProductComponent} from './edit-product/edit-product.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
import {AuthGuard} from "../../guards/auth-guard.service";
import {Role} from "../../models/role";

@NgModule({
  declarations: [EditProductComponent],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: '',
        data: {
          breadcrumb: null
        },
        children: [
          {
            path: '',
            data: {
              breadcrumb: null
            }
          },
          {
            path: ':id',
            data: {
              breadcrumb: 'Product'
            },
            children: [
              {
                path: '',
                data: {
                  breadcrumb: null
                },
                component: ProductComponent
              },
              {
                path: 'edit',
                canActivate: [AuthGuard],
                data: {
                  breadcrumb: 'Edit',
                  roles: [
                    Role.Admin,
                    Role.Owner
                  ]
                },
                component: EditProductComponent
              }
            ]
          }
        ]
      }
    ])
  ]
})
export class ProductModule {
}
