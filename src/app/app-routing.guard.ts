import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, Router, Route} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './services/auth.service';
import {Role} from './models/role';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppRoutingGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
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

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthorized().pipe(
      map(user => {
        if (user) {
          const roles = route.data && route.data.roles as Role[];
          if (roles && !roles.some(r => this.authService.hasRole(r))) {
            return false;
          }
          return true;
        } else {
          return false;
        }
      })
    );
  }

}
