import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {ContactsComponent} from './contacts.component';
import {ContactsSuccessComponent} from './contact-success/contacts-success.component';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        data: {
          breadcrumb: 'Contact'
        },
        children: [
          {
            path: '',
            data: {
              breadcrumb: null
            },
            component: ContactsComponent
          },
          {
            path: 'success',
            data: {
              breadcrumb: 'Success'
            },
            component: ContactsSuccessComponent
          }
        ]
      }
    ])
  ]
})

export class ContactModule {
}
