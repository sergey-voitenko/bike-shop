import { Component } from '@angular/core';

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

  onSubmit(): void {}
}
