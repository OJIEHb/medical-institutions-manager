import { Component, OnInit } from '@angular/core';
import { InstitutionService } from '../../services/institution.service';
import { Institution } from '../../models/institution';

@Component({
  selector: 'app-institution-list',
  templateUrl: './institution-list.component.html',
  styleUrls: ['./institution-list.component.scss']
})
export class InstitutionListComponent implements OnInit {

  institutions: Institution[]

  constructor(private institutionService: InstitutionService) { }

  ngOnInit() {
    this.institutionService.getAllInstitutions()
      .subscribe(institutions => {
        this.institutions = institutions;
      })
  }

}
