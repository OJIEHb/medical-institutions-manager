import { NestedTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { of } from "rxjs";
import { Institution } from '../../models/institution';
import { InstitutionService } from '../../services/institution.service';
import { Router } from '@angular/router';
import { MatDialog } from '../../../../node_modules/@angular/material';
import { RemoveInstitutionDialogComponent } from './remove-institution-dialog/remove-institution-dialog.component';

@Component({
  selector: 'app-institution-hierarchy',
  templateUrl: './institution-hierarchy.component.html',
  styleUrls: ['./institution-hierarchy.component.scss']
})
export class InstitutionHierarchyComponent {
  nestedTreeControl: NestedTreeControl<Institution>;
  nestedDataSource: MatTreeNestedDataSource<Institution>;

  constructor(private institutionService: InstitutionService, private router: Router, public dialog: MatDialog) {
    this.nestedTreeControl = new NestedTreeControl<Institution>(this.getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();

    this.institutionService.getHierarchy()
      .subscribe(institutions => {
        let nodesState = this.getIsExpandedNode();
        this.nestedDataSource.data = institutions;
        this.setIsExpandedNode(nodesState);
      })
  }

  hasNestedChild = (_: number, institution: Institution) => institution.controlledInstitutions;

  private getChildren = (institution: Institution) => of(institution.controlledInstitutions);

  public onAddInstitutionClick() {
    this.router.navigate(['institutions/add']);
  }

  public onDeleteInstitutionClick(institution) {
    this.dialog.open(RemoveInstitutionDialogComponent, {
      data: institution
    });
  }

  private getIsExpandedNode(): Map<string, boolean> {
    let expanded = new Map<string, boolean>();
    this.nestedDataSource.data.forEach(element => {
      expanded.set(element.id, this.nestedTreeControl.isExpanded(element));
      this.nestedTreeControl.getDescendants(element).forEach(child => {
        expanded.set(child.id, this.nestedTreeControl.isExpanded(child));
      })
    });
    return expanded;
  }

  private setIsExpandedNode(nodesState: Map<string, boolean>) {
    this.nestedDataSource.data.forEach(element => {
      if (nodesState.get(element.id))
        this.nestedTreeControl.expand(element);
      this.nestedTreeControl.getDescendants(element).forEach(child => {
        if (nodesState.get(child.id))
          this.nestedTreeControl.expand(child);
      })
    });
  }
}
