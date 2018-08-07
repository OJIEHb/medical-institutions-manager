import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { InstitutionService } from '../../services/institution.service';
import { Institution } from '../../models/institution';
import { ExcelService } from '../../services/excel.service';

@Component({
  selector: 'institution',
  templateUrl: './institution.component.html',
  styleUrls: ['./institution.component.scss']
})
export class InstitutionComponent {

  institution: Institution;

  constructor(private route: ActivatedRoute, 
      private institutionService: InstitutionService, 
      private excelService: ExcelService,
      private router: Router) { 
    this.route.params
      .subscribe(params => {
      this.institutionService.getById(params['id'])
        .subscribe(institution => this.institution = institution)
    })
  }

  public saveInstitutionExcel() {
    console.log("Ok")
    this.excelService.getExcelFromInstitution(this.institution);
  }

  public onEditInstitutionClick() {
    this.router.navigate(['/institutions/edit', this.institution.id]);
  }

}
