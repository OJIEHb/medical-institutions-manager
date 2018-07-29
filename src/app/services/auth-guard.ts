import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map, flatMap } from 'rxjs/operators';

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
