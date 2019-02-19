import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { InstitutionPlaceService } from './services/institution-place.service';
import {InstitutionService} from './services/institution.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  user: firebase.User;
  showDistrictMenu = false;
  showCityMenu = false;
  places = [];

  constructor(private authService: AuthService,
              private router: Router,
              private placeService: InstitutionPlaceService,
              private institutionService: InstitutionService) {
    this.placeService.getByRegionType()
      .subscribe(places => this.places = places);
  }

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

  onCityMenuClick() {
    this.showCityMenu = !this.showCityMenu;
    this.showDistrictMenu = false;
  }

  onDistrictMenuClick() {
    this.showDistrictMenu = !this.showDistrictMenu;
    this.showCityMenu = false;
  }

  refresh() {
    this.institutionService.refresh();
  }
}
