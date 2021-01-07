import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductComponent } from './components/product/product.component';
import { CharLimitationPipe } from './pipes/char-limitation.pipe';
import { SortByDiscountPipe } from './pipes/sort-by-discount.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ContactsComponent,
    NotfoundComponent,
    ProductComponent,
    CharLimitationPipe,
    SortByDiscountPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCo4AXMsSGbfUbKqhjKrt1MscUbOHagrBk'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
