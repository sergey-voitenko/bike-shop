import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './components/main/main.component';
import {NotfoundComponent} from './components/notfound/notfound.component';
import {LoginComponent} from './components/login/login.component';
import {AppRoutingGuard} from './app-routing.guard';
import {Role} from './models/role';
import {SignUpComponent} from './components/signup/sign-up.component';
import {ProfileComponent} from "./components/profile/profile.component";

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
        canActivate: [AppRoutingGuard],
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
        canActivate: [AppRoutingGuard],
        data: {
          roles: [
            Role.Admin
          ]
        },
        loadChildren: () => import('src/app/modules/new-product/new-product.module').then(m => m.NewProductModule)
      },
      {
        path: 'profile',
        canActivate: [AppRoutingGuard],
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
