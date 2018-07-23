import {NestedTreeControl} from '@angular/cdk/tree';
import {Component} from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { of } from "rxjs";
import { Institution } from '../../models/institution';
import { InstitutionService } from '../../services/institution.service';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-institution-hierarchy',
  templateUrl: './institution-hierarchy.component.html',
  styleUrls: ['./institution-hierarchy.component.scss']
})
export class InstitutionHierarchyComponent {
  nestedTreeControl: NestedTreeControl<Institution>;
  nestedDataSource: MatTreeNestedDataSource<Institution>;

  constructor(private institutionService: InstitutionService, private router: Router) {
    this.nestedTreeControl = new NestedTreeControl<Institution>(this.getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();

    this.institutionService.getHierarchy()
      .subscribe(institutions => {
        this.nestedDataSource.data = institutions;
      })
  }

  hasNestedChild = (_: number, institution: Institution) => institution.controlledInstitutions;

  private getChildren = (institution: Institution) => of (institution.controlledInstitutions);

  public onAddInstitutionClick() {
    this.router.navigate(['institutions/add']);
  }
}
