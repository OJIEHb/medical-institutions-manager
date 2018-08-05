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

  public getPaginatorLength(): number {
    if (this.filtredInstitutions)
      return this.filtredInstitutions.length;
    return 0;
  }

  public getInitialValuesForSliders(): any {
    let params = { totalPopulation: 5, vehiclesReality: 4, computerEquipmentReality: 2 }
    this.filtredInstitutions
      .filter(institution => institution.type === 1)
      .forEach(institution => {
        params.totalPopulation = institution.totalPopulation > params.totalPopulation ? institution.totalPopulation : params.totalPopulation;
        params.totalPopulation = institution.vehiclesReality > params.vehiclesReality ? institution.vehiclesReality : params.vehiclesReality;
        params.totalPopulation = institution.computerEquipmentReality > params.computerEquipmentReality ? institution.computerEquipmentReality : params.computerEquipmentReality;
      });
    console.log(params);
    return params;
  }

  private filter(filter) {
    let filtred = this.originalInstitutions;
    Object.keys(filter).forEach(key => {
      switch (filter[key].type) {
        case 'single':
          filtred = filtred.filter(institution => {
            return filter[key].value.length ? filter[key].value.includes(institution[key]) : true;
          });
          break;
        case 'multi':
          filtred = filtred.filter(institution => {
            if (institution[key] && filter[key].value.length)
              return institution[key].reduce((acc, val) => filter[key].value.includes(val) ? true : acc, false)
            return filter[key].value.length ? false : true;
          });
          break;
        case 'range':
          filtred = filtred.filter(institution => {
            if (filter[key].min || filter[key].max) {
              if (filter[key].min && filter[key].max) {
                return institution[key] >= filter[key].min && institution[key] <= filter[key].max;
              } else if (filter[key].min) {
                return institution[key] >= filter[key].min;
              } else {
                return institution[key] <= filter[key].max;
              }
            } else
              return true;
          });
          break;
      }
    })
    this.filtredInstitutions = filtred;
  }
}
