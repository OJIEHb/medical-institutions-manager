import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { Institution } from '../../models/institution';
import { InstitutionService } from '../../services/institution.service';
import { Filter } from '../../models/filter';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  isLoggedIn: boolean = false;
  filter: Filter;
  institutions: Institution[];

  constructor(private router: Router,
    private authService: AuthService,
    private institutionsService: InstitutionService,
    private route: ActivatedRoute) {
    this.authService.isLoggedIn()
      .subscribe(result => this.isLoggedIn = result);

    this.route
      .queryParams
      .subscribe(params => {
        let filterKey = params['place'] ? 'place' : params['regionType'] ? 'regionType' : null;
        if (filterKey)
          this.institutionsService.getFiltredInstitutions({ key: filterKey, predicate: '=', value: +params[filterKey] || params[filterKey]})
            .subscribe(institutions => this.institutions = institutions);
        else
          this.institutionsService.getAll().subscribe(institutions => this.institutions = institutions);
      });

  }

  public onAddInstitutionClick() {
    this.router.navigate(['institutions/add']);
  }
}
