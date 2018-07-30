import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { of, Observable } from "rxjs";
import { Institution } from '../../models/institution';
import { InstitutionService } from '../../services/institution.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { RemoveInstitutionDialogComponent } from './remove-institution-dialog/remove-institution-dialog.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'institution-hierarchy',
  templateUrl: './institution-hierarchy.component.html',
  styleUrls: ['./institution-hierarchy.component.scss']
})
export class InstitutionHierarchyComponent implements OnChanges {
  @Input()
  institutions: Institution[];

  nestedTreeControl: NestedTreeControl<Institution>;
  nestedDataSource: MatTreeNestedDataSource<Institution>;

  isLoggedIn: boolean = false;

  constructor(private institutionService: InstitutionService,
    public dialog: MatDialog,
    private router: Router,
    private authService: AuthService) {
    this.nestedTreeControl = new NestedTreeControl<Institution>(this.getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();

    this.authService.isLoggedIn()
      .subscribe(result => this.isLoggedIn = result);
  }

  ngOnChanges() {
    if (this.institutions) {
      console.log(this.institutions);
      let nodesState = this.getIsExpandedNode();
      this.nestedDataSource.data = this.institutionService.getHierarchy(this.institutions);
      console.log(this.institutionService.getHierarchy(this.institutions));
      this.setIsExpandedNode(nodesState);
    }
  }

  hasNestedChild = (_: number, institution: Institution) => institution.controlledInstitutions;

  private getChildren = (institution: Institution) => of(institution.controlledInstitutions);

  public onDeleteInstitutionClick(institution: Institution) {
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
