import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {Role} from '../models/role';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import firebase from 'firebase';
import auth = firebase.auth;
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import {map, switchMap, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly user: User;

  constructor(private firebaseAuth: AngularFireAuth) {
    this.user = {
      authState: firebaseAuth.authState
    };
  }

  signUp(email: string, password: string): Promise<any> {
    return this.firebaseAuth.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string): Promise<any> {
    return this.firebaseAuth.signInWithEmailAndPassword(email, password);
  }

  logout(): Promise<any> {
    this.user.role = undefined;
    return this.firebaseAuth.signOut();
  }

  googleAuth(): Promise<any> {
    return this.googleAuthLogin(new auth.GoogleAuthProvider());
  }

  googleAuthLogin(provider: GoogleAuthProvider): Promise<any> {
    return this.firebaseAuth.signInWithPopup(provider);
  }

  isAuthorized(): Observable<firebase.User | null> {
    return this.user.authState;
  }

  hasRole(role: Role): boolean {
    return this.user?.role === role;
  }

  getRole(): Role | undefined {
    return this.user.role;
  }

  setRole(role: Role): void {
    this.user.role = role;
  }

  initCurrentUserRole(): Observable<firebase.User | null> {
    return this.firebaseAuth.authState.pipe(
      switchMap(() => this.firebaseAuth.currentUser),
      tap(user => {
        if (user?.uid === '6CHsRwmWPggFKvlBHfgCp581rgo1') {
          this.setRole(Role.Admin);
        } else if (user?.uid === 'l68mmj536CP4S6LdvASdFO3SZC93') {
          this.setRole(Role.Owner);
        } else {
          this.setRole(Role.Customer);
        }
      })
    );
  }
}
