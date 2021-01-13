import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AgmCoreModule} from '@agm/core';

import {AppComponent} from './app.component';
import {MainComponent} from './components/main/main.component';
import {ContactsComponent} from './components/contacts/contacts.component';
import {NotfoundComponent} from './components/notfound/notfound.component';
import {AppRoutingModule} from './app-routing.module';
import {CardComponent} from './components/card/card.component';
import {ProductComponent} from './components/product/product.component';
import {ReviewsComponent} from './components/reviews/reviews.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {SharedModule} from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ContactsComponent,
    NotfoundComponent,
    CardComponent,
    ProductComponent,
    ReviewsComponent,
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
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
