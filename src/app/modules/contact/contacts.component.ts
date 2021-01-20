import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {
  nameField = '';
  surnameField = '';
  emailField = '';
  descriptionField = '';

  constructor(private router: Router) {
  }

  onSubmit(): void {
    this.router.navigate(['contact/success']);
  }
}
