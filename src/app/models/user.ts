import {Role} from './role';
import {Observable} from 'rxjs';
import firebase from 'firebase';

export interface User {
  role?: Role;
  authState: Observable<firebase.User | null>;
}
