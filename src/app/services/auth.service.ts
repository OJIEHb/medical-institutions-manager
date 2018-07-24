import { Injectable, OnInit } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { UserCredentials } from '../models/user-credantials';

@Injectable()
export class AuthService {

  constructor(private firebaseAuth: AngularFireAuth, private router: Router) { }

  isLoggedIn(): Observable<boolean> {
    return this.firebaseAuth.authState
      .pipe(map(user => {
        return user ? true : false;
      }));
  }

  getCurrentUser() {
    return this.firebaseAuth.authState;
  }

  logout(): Observable<void> {
    return from(this.firebaseAuth.auth.signOut());
  }

  login(credentials: UserCredentials): Observable<firebase.auth.UserCredential> {
    return from(this.firebaseAuth.auth
      .signInWithEmailAndPassword(credentials.email, credentials.password));
  }
}
