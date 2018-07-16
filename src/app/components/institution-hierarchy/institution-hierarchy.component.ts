import {NestedTreeControl} from '@angular/cdk/tree';
import {Component} from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { of } from "rxjs";
import { Institution } from '../../models/institution';
import { InstitutionService } from '../../services/institution.service';

@Component({
  selector: 'app-institution-hierarchy',
  templateUrl: './institution-hierarchy.component.html',
  styleUrls: ['./institution-hierarchy.component.scss']
})
export class InstitutionHierarchyComponent {
  nestedTreeControl: NestedTreeControl<Institution>;
  nestedDataSource: MatTreeNestedDataSource<Institution>;

  constructor(private institutionService: InstitutionService) {
    this.nestedTreeControl = new NestedTreeControl<Institution>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();

    this.institutionService.getAll()
      .subscribe(institutions => {
        this.nestedDataSource.data = institutions;
        console.log(institutions);
      })
  }

  hasNestedChild = (_: number, institution: Institution) => institution.controlledInstitutions;

  private _getChildren = (institution: Institution) => of (institution.controlledInstitutions);
}
