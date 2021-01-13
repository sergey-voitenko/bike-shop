import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OrderComponent} from '../components/order/order.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    OrderComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: '', component: OrderComponent}
    ]),
    SharedModule
  ]
})
export class OrderModule {
}
