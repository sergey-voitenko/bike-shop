import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AngularFireModule} from '@angular/fire';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AgmCoreModule} from '@agm/core';

import {AppComponent} from './app.component';
import {MainComponent} from './components/main/main.component';
import {ContactsComponent} from './modules/contact/contacts.component';
import {NotfoundComponent} from './components/notfound/notfound.component';
import {AppRoutingModule} from './app-routing.module';
import {CardComponent} from './components/card/card.component';
import {ProductComponent} from './modules/product/product.component';
import {SharedModule} from './shared/shared.module';
import {OrderSuccessComponent} from './modules/order/order-success/order-success.component';
import {ContactsSuccessComponent} from './modules/contact/contact-success/contacts-success.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {environment} from '../environments/environment';
import {ExchangeCurrencyPipe} from './pipes/exchange-currency.pipe';
import {BreadcrumbsComponent} from './components/breadcrumbs/breadcrumbs.component';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import { LoginComponent } from './components/login/login.component';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { SignUpComponent } from './components/signup/sign-up.component';
import { ProfileComponent } from './components/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ContactsComponent,
    NotfoundComponent,
    CardComponent,
    ProductComponent,
    OrderSuccessComponent,
    ContactsSuccessComponent,
    ExchangeCurrencyPipe,
    BreadcrumbsComponent,
    LoginComponent,
    SignUpComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCo4AXMsSGbfUbKqhjKrt1MscUbOHagrBk'
    }),
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    SharedModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'cloud'),
    AngularFireStorageModule,
    AngularFireAuthModule,
    BreadcrumbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
