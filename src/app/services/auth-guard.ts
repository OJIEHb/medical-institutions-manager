import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '../../../node_modules/@angular/router';
import { map, flatMap } from '../../../node_modules/rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate{

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): Observable<boolean> | boolean {
    return this.authService.isLoggedIn()
      .pipe(map(isLoggedIn => {
        if (!isLoggedIn)
          this.router.navigate(['login']);
        return true;
      }));
  }
}
