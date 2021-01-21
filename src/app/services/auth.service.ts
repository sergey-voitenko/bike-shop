import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {Role} from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User | null | undefined;

  isAuthorized(): boolean {
    return !!this.user;
  }

  hasRole(role: Role): boolean {
    return this.isAuthorized() && this.user?.role === role;
  }

  login(role: Role): void {
    this.user = { role };
    console.log(this.user.role);
  }

  logout(): void {
    this.user = null;
  }
}
