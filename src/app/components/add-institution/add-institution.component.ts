import { Component, OnInit } from '@angular/core';
import { Institution } from '../../models/institution';
import { Router } from '../../../../node_modules/@angular/router';
import { InstitutionService } from '../../services/institution.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'add-institution',
  templateUrl: './add-institution.component.html',
  styleUrls: ['./add-institution.component.scss']
})
export class AddInstitutionComponent {

  mainFormGroup: FormGroup;
  contactFormGroup: FormGroup;
  legalFormGroup: FormGroup;

  constructor(private institutionService: InstitutionService, 
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.mainFormGroup = this.formBuilder.group({
      place: ['']  ,
      geographicalInstitutionType: [''],
      placeType: [''],
      fullName: [''],
      fullAddress: ['']
    });
    this.contactFormGroup = this.formBuilder.group({
      email: [''],
      phone: [''],
      fax: [''],
      site: ['']
    });
    this.legalFormGroup = this.formBuilder.group({
      legalStatus: [''],
      stateRegisterCode: [''],
      classifierObjectCode: [''],
      ownership: [''],
      legalFormCode: ['']
    });
  }

  public saveInstitution() {
    this.institutionService.addInstitution(Object.assign({}, this.mainFormGroup.value, this.contactFormGroup.value, this.legalFormGroup.value));
    this.router.navigate(['']);
  } 

}
