import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  user: firebase.User;
  showDistrictMenu = false;
  showCityMenu = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => {
      this.user = user;
    });
  }

  login() {
    this.router.navigate(['login']);
  }

  logout() {
    this.authService.logout();
  }
}
