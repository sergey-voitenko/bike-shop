import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {Role} from '../../models/role';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  email = '';
  password = '';

  login(): void {
    this.authService.login(this.email, this.password).then((res) => {
      this.router.navigate(['/']);
    });
  }
}
