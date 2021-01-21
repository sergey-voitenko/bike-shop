import { Component } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent{
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  email = '';
  password = '';

  signUp(): void {
    this.authService.signUp(this.email, this.password).then(() => {
      this.router.navigate(['/']);
    });
  }
}
