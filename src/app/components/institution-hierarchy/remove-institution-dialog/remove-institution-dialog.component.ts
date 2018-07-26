import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../../../node_modules/@angular/material';
import { Institution } from '../../../models/institution';
import { InstitutionService } from '../../../services/institution.service';

@Component({
  selector: 'app-remove-institution-dialog',
  templateUrl: './remove-institution-dialog.component.html',
  styleUrls: ['./remove-institution-dialog.component.scss']
})
export class RemoveInstitutionDialogComponent {

  constructor(public dialogRef: MatDialogRef<RemoveInstitutionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Institution,
    private institutionService: InstitutionService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.institutionService.delete(this.data);
    this.dialogRef.close();
  }
}
