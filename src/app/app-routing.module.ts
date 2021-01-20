import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './components/main/main.component';
import {NotfoundComponent} from './components/notfound/notfound.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '', component: MainComponent
      },
      {
        path: 'contact',
        loadChildren: () => import('src/app/modules/contact/contact.module').then(m => m.ContactModule)
      },
      {
        path: 'product',
        loadChildren: () => import('src/app/modules/product/product.module').then(m => m.ProductModule)
      },
      {
        path: 'order',
        loadChildren: () => import('src/app/modules/order/order.module').then(m => m.OrderModule)
      },
      {
        path: 'new-product',
        loadChildren: () => import('src/app/modules/new-product/new-product.module').then(m => m.NewProductModule)
      },
      {
        path: '**',
        component: NotfoundComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
