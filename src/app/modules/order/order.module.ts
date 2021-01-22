import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OrderComponent} from './order.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {OrderSuccessComponent} from './order-success/order-success.component';

@NgModule({
  declarations: [
    OrderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        data: {
          breadcrumb: 'Order'
        },
        children: [
          {
            path: '',
            data: {
              breadcrumb: null
            },
            component: OrderComponent
          },
          {
            path: 'success',
            data: {
              breadcrumb: 'Success'
            },
            component: OrderSuccessComponent
          }
        ]
      }
    ]),
    SharedModule
  ]
})
export class OrderModule {
}
