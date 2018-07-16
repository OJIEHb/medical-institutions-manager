import { Component, OnInit } from '@angular/core';
import { InstitutionService } from '../../services/institution.service';
import { Institution } from '../../models/institution';
import { Router } from '@angular/router';

@Component({
  selector: 'app-institution-list',
  templateUrl: './institution-list.component.html',
  styleUrls: ['./institution-list.component.scss']
})
export class InstitutionListComponent implements OnInit {

  institutions: Institution[]

  constructor(private institutionService: InstitutionService, private router: Router) { }

  ngOnInit() {
    this.institutionService.getAll()
      .subscribe(institutions => {
        this.institutions = institutions;
      })
  }

  public onAddInstitutionClick() {
    this.router.navigate(['institutions/add']);
    console.log('institutions/add');
  }

}
