import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MainComponent} from "./components/main/main.component";
import {ContactsComponent} from "./components/contacts/contacts.component";
import {NotfoundComponent} from "./components/notfound/notfound.component";

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
