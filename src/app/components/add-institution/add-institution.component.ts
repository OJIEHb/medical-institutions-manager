import { Component, OnInit } from '@angular/core';
import { Institution } from '../../models/institution';
import { Router, ActivatedRoute } from '@angular/router';
import { InstitutionService } from '../../services/institution.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'add-institution',
  templateUrl: './add-institution.component.html',
  styleUrls: ['./add-institution.component.scss']
})
export class AddInstitutionComponent {

  institutionFormGroup: FormGroup;
  parentId: string;
  type: number;
  institution: Institution;
  isUpdating: boolean;

  constructor(private institutionService: InstitutionService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {
    this.route
      .queryParams
      .subscribe(params => {
        this.parentId = params['parent'];
        this.type = params['type'] || 1;
      });


    this.initForms();
    this.route.params.subscribe(params => {
      this.isUpdating = params['id']? true: false;
      if (params['id'])
        this.institutionService.getById(params['id'])
          .subscribe(institution => {
            this.institution = institution;
            this.institutionFormGroup.patchValue(institution)
          });
    })
  }

  public saveInstitution() {
    let institution = this.institutionFormGroup.value as Institution;

    institution.equipment = +institution.equipment;
    institution.medicamentEquipment = +institution.medicamentEquipment;

    if (this.parentId)
      institution.controlledBy = this.parentId;

    if (institution.institutionType === "село")
      institution.type = 4;
    else
      institution.type = +this.type;

    this.institutionService.create(institution);
    this.router.navigate(['']);
  }

  public updateInstitution() {
    let institution = Object.assign(this.institution, this.institutionFormGroup.value);
    this.institutionService.update(institution.id, institution);
    this.router.navigate(['']);
  }

  private initForms() {
    this.institutionFormGroup = this.formBuilder.group({
      place: [],
      subordinationLevel: [],
      placeType: [],
      institutionType: [],
      fullName: [],
      fullAddress: [],
      legalStatus: [false],
      stateRegisterCode: [],
      classifierObjectCode: [],
      ownership: [],
      legalFormCode: [],
      type: [],
      email: [, Validators.email],
      phone: [],
      fax: [],
      site: [],
      headDoctor: this.formBuilder.group({
        name: [],
        workPhone: [],
        homePhone: []
      }),
      headDoctorSecretary: this.formBuilder.group({
        name: [],
        workPhone: []
      }),
      receptionOffice: [false],
      receptionOfficePhone: [],
      registryOffice: [false],
      registryOfficePhone: [],
      medicalСare: [],
      medicalAidTypes: [[]],
      declaredAssistanceForms: [],
      license: false,
      licenseNumber: [],
      licenseDate: [111111111],
      startLicenseValidity: [],
      endLicenseValidity: [],
      accreditationCategoryType: [],
      accreditationСategoryNumber: [],
      lastAccreditation: [],
      startAccreditationValidity: [],
      endAccreditationValidity: [],
      hospitalBedsNumber: [],
      hospitalCapacity: [],
      regularDoctorNumber: [],
      busyDoctorNumber: [],
      individualsDoctorNumber: [],
      middleRegularPersonalNumber: [],
      middleBusyPersonalNumber: [],
      middleIndividualsPersonalNumber: [],
      otherRegularPersonalNumber: [],
      otherBusyPersonalNumber: [],
      otherIndividualsPersonalNumber: [],
      totalRegularPersonalNumber: [],
      totalBusyPersonalNumber: [],
      totalIndividualsPersonalNumber: [],
      typicalBuilding: [false],
      heatingType: [''],
      coldWaterSupply: [false],
      hotWaterSupply: [false],
      internetSupply: [false],
      equipment: [],
      medicamentEquipment: [],
      vehiclesNeed: [],
      vehiclesReality: [],
      vehiclesWay: [],
      computerEquipmentNeed: [],
      computerEquipmentReality: [],
      population: []
    });
  }
}
