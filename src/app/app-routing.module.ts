import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { MainComponent } from "./components/main/main.component";
import { ContactsComponent } from "./components/contacts/contacts.component";
import { ProductComponent } from "./components/product/product.component";
import { NotfoundComponent } from "./components/notfound/notfound.component";
import { ReviewsComponent } from "./components/reviews/reviews.component";

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: 'product/:id', component: ProductComponent},
  {path: 'reviews/:id', component: ReviewsComponent},
  {path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
