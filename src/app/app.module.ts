import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { ContactsComponent } from './contacts/contacts.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductComponent } from './main/product/product.component';
import { CharLimitationPipe } from './main/char-limitation.pipe';
import { ProductSmallComponent } from './main/product-small/product-small.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ContactsComponent,
    NotfoundComponent,
    ProductComponent,
    CharLimitationPipe,
    ProductSmallComponent
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
