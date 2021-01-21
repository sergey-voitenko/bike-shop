import {Component, OnDestroy, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable, Subject} from 'rxjs';
import {switchMap, takeUntil} from 'rxjs/operators';
import {AuthService} from '../../services/auth.service';
import firebase from "firebase";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy{
  authState: Observable<firebase.User | null>;
  email: string | null | undefined = '';
  role: string | null | undefined = '';
  destroyed$ = new Subject();

  constructor(
    private firebaseAuth: AngularFireAuth,
    private authService: AuthService
  ) {
    this.authState = firebaseAuth.authState;
  }

  ngOnInit(): void {
    this.initUser();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  initUser(): void {
    this.authState.pipe(
      switchMap(() => this.firebaseAuth.currentUser),
      takeUntil(this.destroyed$)
    ).subscribe((user) => {
      this.email = user?.email;
      this.role = this.authService.getRole();
    });
  }
}
