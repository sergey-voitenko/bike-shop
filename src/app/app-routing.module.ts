import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './components/main/main.component';
import {NotfoundComponent} from './components/notfound/notfound.component';
import {AuthGuard} from './guards/auth-guard.service';
import {Role} from './models/role';
import {ProfileComponent} from './components/profile/profile.component';
import {CartComponent} from './components/cart/cart.component';
import {CartGuard} from "./guards/cart-guard.service";

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
        canActivate: [AuthGuard],
        data: {
          roles: [
            Role.Customer,
            Role.Admin,
            Role.Owner
          ]
        },
        loadChildren: () => import('src/app/modules/order/order.module').then(m => m.OrderModule)
      },
      {
        path: 'new-product',
        canActivate: [AuthGuard],
        data: {
          roles: [
            Role.Admin
          ]
        },
        loadChildren: () => import('src/app/modules/product/new-product/new-product.module').then(m => m.NewProductModule)
      },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        data: {
          breadcrumb: 'Profile',
          roles: [
            Role.Customer,
            Role.Admin,
            Role.Owner
          ]
        },
        component: ProfileComponent
      },
      {
        path: 'cart',
        canActivate: [CartGuard, AuthGuard],
        data: {
          breadcrumb: 'Cart',
          roles: [
            Role.Customer,
            Role.Admin,
            Role.Owner
          ]
        },
        component: CartComponent
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
