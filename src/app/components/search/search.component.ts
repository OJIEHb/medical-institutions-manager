import { Component } from '@angular/core';
import { InstitutionService } from '../../services/institution.service';
import { Institution } from '../../models/institution';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  public filtredInstitutions: Institution[];

  public search: string;


  private originalInstitutions: Institution[];
  private filterParam = {};
  constructor(private institutionService: InstitutionService, private router: Router) {
    this.institutionService.getAll()
      .subscribe(institutions => {
        this.originalInstitutions = institutions;
        this.filter(this.filterParam);
      });
  }

  public onSearchChange() {
    this.filter(this.filterParam);
    this.filtredInstitutions = this.filtredInstitutions
      .filter(institution => institution.fullName.toLowerCase().includes(this.search.toLocaleLowerCase()));
  }

  public onClearSearchClick() {
    this.search = '';
    this.filter(this.filterParam);
  }

  public onInstitutionClick(institution: Institution) {
    this.router.navigate(['/institution', institution.id])
  }

  public onFilterChange(filter) {
    this.filterParam = filter;
    this.filter(filter);
    if (this.search)
      this.filtredInstitutions = this.filtredInstitutions
        .filter(institution => institution.fullName.toLowerCase().includes(this.search.toLocaleLowerCase()));
  }

  private filter(filter) {
    let filtred = this.originalInstitutions;
    Object.keys(filter).forEach(key => {
      filtred = filtred.filter(intitution => filter[key].length ? filter[key].includes(intitution[key]) : true);
    })
    this.filtredInstitutions = filtred;
  }
}
