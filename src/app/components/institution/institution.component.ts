import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InstitutionService } from '../../services/institution.service';
import { Institution } from '../../models/institution';
import { ExcelService } from '../../services/excel/excel.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'institution',
  templateUrl: './institution.component.html',
  styleUrls: ['./institution.component.scss']
})
export class InstitutionComponent {

  institution: Institution;
  isLoggedIn: boolean = false;

  constructor(private route: ActivatedRoute, 
      private institutionService: InstitutionService, 
      private excelService: ExcelService,
      private router: Router,
      private authService: AuthService) { 
    this.route.params
      .subscribe(params => {
      this.institutionService.getById(params['id'])
        .subscribe(institution => this.institution = institution)
    });
    this.authService.isLoggedIn().subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
  }

  public saveInstitutionExcel() {
    console.log("Ok")
    this.excelService.getExcelFromInstitution(this.institution);
  }

  public onEditInstitutionClick() {
    this.router.navigate(['/institutions/edit', this.institution.id], {queryParams: { type: this.institution.type }});
  }

}
