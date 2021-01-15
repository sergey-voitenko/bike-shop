import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MainComponent} from './components/main/main.component';
import {ContactsComponent} from './components/contacts/contacts.component';
import {ProductComponent} from './components/product/product.component';
import {NotfoundComponent} from './components/notfound/notfound.component';
import {ReviewsComponent} from './components/reviews/reviews.component';
import {ContactsSuccessComponent} from './components/contacts-success/contacts-success.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: 'contacts/success', component: ContactsSuccessComponent},
  {path: 'product/:id', component: ProductComponent},
  {path: 'reviews/:id', component: ReviewsComponent},
  {path: 'order', loadChildren: () => import('src/app/modules/order.module').then(m => m.OrderModule)},
  {path: 'new-product', loadChildren: () => import('src/app/modules/new-product.module').then(m => m.NewProductModule)},
  {path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
