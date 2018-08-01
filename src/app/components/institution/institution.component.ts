import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { InstitutionService } from '../../services/institution.service';
import { Institution } from '../../models/institution';

@Component({
  selector: 'institution',
  templateUrl: './institution.component.html',
  styleUrls: ['./institution.component.scss']
})
export class InstitutionComponent {

  institution: Institution;

  constructor(private route: ActivatedRoute, private institutionService: InstitutionService) { 
    this.route.params
      .subscribe(params => {
      this.institutionService.getById(params['id'])
        .subscribe(institution => {
          this.institution = institution;
        })
    })
  }

}
