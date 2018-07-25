import { NestedTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { of } from "rxjs";
import { Institution } from '../../models/institution';
import { InstitutionService } from '../../services/institution.service';
import { Router } from '@angular/router';
import { isNgTemplate } from '../../../../node_modules/@angular/compiler';

@Component({
  selector: 'app-institution-hierarchy',
  templateUrl: './institution-hierarchy.component.html',
  styleUrls: ['./institution-hierarchy.component.scss']
})
export class InstitutionHierarchyComponent {
  nestedTreeControl: NestedTreeControl<Institution>;
  nestedDataSource: MatTreeNestedDataSource<Institution>;
  expanded = {};

  constructor(private institutionService: InstitutionService, private router: Router) {
    this.nestedTreeControl = new NestedTreeControl<Institution>(this.getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();

    this.institutionService.getHierarchy()
      .subscribe(institutions => {
        //TODO: REFACTOR!!!
        this.nestedDataSource.data.forEach(element => {
          this.expanded[element.id] = this.nestedTreeControl.isExpanded(element);
          this.nestedTreeControl.getDescendants(element).forEach(child => {
            this.expanded[child.id] = this.nestedTreeControl.isExpanded(child);
          })
        });
        this.nestedDataSource.data = institutions;
        this.nestedDataSource.data.forEach(element => {
          if (this.expanded[element.id])
            this.nestedTreeControl.expand(element);
          this.nestedTreeControl.getDescendants(element).forEach(child => {
            if (this.expanded[child.id])
              this.nestedTreeControl.expand(child);
          })
        });
      })
  }

  hasNestedChild = (_: number, institution: Institution) => institution.controlledInstitutions;

  private getChildren = (institution: Institution) => of(institution.controlledInstitutions);

  public onAddInstitutionClick() {
    this.router.navigate(['institutions/add']);
  }

  public onDeleteInstitutionClick(institution) {
    this.institutionService.delete(institution);
  }
}
