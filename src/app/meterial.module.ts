import { NgModule } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatStepperModule,
  MatSelectModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatDividerModule,
  MatSlideToggleModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTreeModule,
  MatDialogModule,
  MatCardModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatSliderModule,
  MatAutocompleteModule,
  MatPaginatorModule,
  MatTooltipModule,
  MatIconRegistry,
} from '@angular/material';


@NgModule({
  imports: [
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatSelectModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTreeModule,
    MatDialogModule,
    MatCardModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    MatPaginatorModule
  ],
  exports: [
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatSelectModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTreeModule,
    MatDialogModule,
    MatCardModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    MatPaginatorModule,
    MatTooltipModule,
  ]
})
export class MaterialModule {
  constructor(private matIconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      `xlsx`,
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/xlsx.svg')
    );
  }
}