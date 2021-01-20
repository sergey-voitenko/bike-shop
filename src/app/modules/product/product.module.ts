import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {ProductComponent} from './product.component';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        data: {
          breadcrumb: ''
        },
        component: ProductComponent
      }
    ])
  ]
})
export class ProductModule { }
