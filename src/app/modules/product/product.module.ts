import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {ProductComponent} from './product.component';
import {ProductEditComponent} from './edit/product-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingGuard} from "../../app-routing.guard";
import {Role} from "../../models/role";

@NgModule({
  declarations: [ProductEditComponent],
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
                canActivate: [AppRoutingGuard],
                data: {
                  breadcrumb: 'Edit',
                  roles: [
                    Role.Admin,
                    Role.Owner
                  ]
                },
                component: ProductEditComponent
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
