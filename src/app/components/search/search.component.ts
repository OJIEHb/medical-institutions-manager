import { Component, OnInit } from '@angular/core';
import { InstitutionService } from '../../services/institution.service';
import { Institution } from '../../models/institution';
import { InstitutionPlaceService } from '../../services/institution-place.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  private originalInstitutions: Institution[];
  public filtredInstitutions: Institution[];
  public placeGroups: any;
  public search: string;

  constructor(private institutionService: InstitutionService, private placeService: InstitutionPlaceService) {
    this.institutionService.getAll()
      .subscribe(institutions => {
        this.originalInstitutions = institutions;
        this.filtredInstitutions = this.filter(institutions);
      });
    this.placeService.getByGroup().subscribe(groups => this.placeGroups = groups);
  }

  public onSearchChange() {
    this.filtredInstitutions = this.filter(this.originalInstitutions);
    this.filtredInstitutions = this.filtredInstitutions
      .filter(institution => institution.fullName.toLowerCase().includes(this.search.toLocaleLowerCase()));
  }

  public onClearSearchClick() {
    this.search = '';
    this.filtredInstitutions = this.filter(this.originalInstitutions);
  }

  private filter(institutions: Institution[]) {
    return institutions;
  }
}
