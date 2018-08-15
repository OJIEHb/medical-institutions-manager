import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Institution } from '../../models/institution';
import { InstitutionService } from '../../services/institution.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { RemoveInstitutionDialogComponent } from './remove-institution-dialog/remove-institution-dialog.component';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

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
  licenseEnd = [];
  licenseAlertIsShowed = false;
  accreditationAlertIsShowed = false;

  constructor(private institutionService: InstitutionService,
    public dialog: MatDialog,
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService) {
    this.nestedTreeControl = new NestedTreeControl<Institution>(this.getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();

    this.authService.isLoggedIn()
      .subscribe(result => this.isLoggedIn = result);
  }

  ngOnChanges() {
    if (this.institutions) {
      let nodesState = this.getIsExpandedNode();
      this.nestedDataSource.data = this.institutionService.getHierarchy(this.institutions);

      this.setIsExpandedNode(nodesState);

      if (!this.licenseAlertIsShowed && !this.accreditationAlertIsShowed) {
        this.toastService.dismissAll();
        this.licenseAlertIsShowed = true;
        this.accreditationAlertIsShowed = true;
        this.showLicenseAlert();
        this.showAccreditationAlert();
      }
    }
  }

  hasNestedChild = (_: number, institution: Institution) => institution.controlledInstitutions;

  private getChildren = (institution: Institution) => institution.controlledInstitutions;

  public onDeleteInstitutionClick(institution: Institution) {
    this.dialog.open(RemoveInstitutionDialogComponent, {
      data: institution
    });
  }

  public onInstitutionClick(institution: Institution) {
    this.router.navigate(["/institution", institution.id])
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

  private showLicenseAlert() {
    setTimeout(() => {
      this.institutions.forEach(institution => {
        if (institution.license && new Date(institution.endLicenseValidity).getTime() <= new Date().getTime())
          this.toastService.showWarning('Увага! Закінчилась ліцензія', institution.fullName, () => {
            this.router.navigate(['/institutions/edit', institution.id], { queryParams: { type: institution.type } });
          });
      })
    }, 250)
  }

  private showAccreditationAlert() {
    setTimeout(() => {
      this.institutions.forEach(institution => {
        if (institution.accreditationCategoryType == 'наявна' && new Date(institution.endAccreditationValidity).getTime() <= new Date().getTime())
          this.toastService.showWarning('Увага! Закінчилась акредитація', institution.fullName, () => {
            this.router.navigate(['/institutions/edit', institution.id], { queryParams: { type: institution.type } });
          });
      })
    }, 250)
  }
}
