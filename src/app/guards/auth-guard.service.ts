import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, Router, Route, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {Role} from '../models/role';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isAuthorized().pipe(
      map(user => {
        if (user) {
          const roles = route.data.roles as Role[];
          if (roles && !roles.some(r => this.authService.hasRole(r))) {
            this.router.navigate(['error', 'not-found']);
            return false;
          }
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      })
    );
  }
}
