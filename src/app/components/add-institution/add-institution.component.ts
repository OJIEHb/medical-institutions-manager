import { Component, OnInit } from '@angular/core';
import { Institution } from '../../models/institution';
import { Router, ActivatedRoute } from '@angular/router';
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
  resourceFormGroup: FormGroup;
  fullFormGroup: FormGroup;
  villageFormGroup: FormGroup;
  parentId: string;
  type: number;

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
  }

  ngOnInit() {
    this.mainFormGroup = this.formBuilder.group({
      place: [''],
      subordinationLevel: [''],
      placeType: [''],
      institutionType: [''],
      fullName: [''],
      fullAddress: [''],
      legalStatus: [false],
      stateRegisterCode: [''],
      classifierObjectCode: [''],
      ownership: [''],
      legalFormCode: [''],
      type: [0]
    });
    this.contactFormGroup = this.formBuilder.group({
      email: ['', Validators.email],
      phone: [''],
      fax: [''],
      site: [''],
      headDoctor: this.formBuilder.group({
        name: [''],
        workPhone: [''],
        homePhone: ['']
      }),
      headDoctorSecretary: this.formBuilder.group({
        name: [''],
        workPhone: ['']
      }),
    });
    this.fullFormGroup = this.formBuilder.group({
      receptionOffice: [false],
      receptionOfficePhone: [''],
      registryOffice: [false],
      registryOfficePhone: [''],
      medicalСare: [''],
      medicalAidTypes: [[]],
      declaredAssistanceForms: [''],
      license: false,
      licenseNumber: [''],
      licenseDate: new Date(),
      startLicenseValidity: new Date(),
      endLicenseValidity: new Date(),
      accreditationCategoryType: [''],
      accreditationСategoryNumber: [''],
      lastAccreditation: new Date(),
      startAccreditationValidity: new Date(),
      endAccreditationValidity: new Date()
    });
    this.resourceFormGroup = this.formBuilder.group({
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
      equipment: [0],
      medicamentEquipment: [0],
      vehiclesNeed: [],
      vehiclesReality: [],
      vehiclesWay: [],
      computerEquipmentNeed: [],
      computerEquipmentReality: [],
      population: [0]
    });
    this.villageFormGroup = this.formBuilder.group({
      population: [0]
    })

  }

  public saveInstitution() {
    this.fullFormGroup.value.licenseDate = this.fullFormGroup.value.licenseDate.getTime();
    this.fullFormGroup.value.startLicenseValidity = this.fullFormGroup.value.startLicenseValidity.getTime();
    this.fullFormGroup.value.endLicenseValidity = this.fullFormGroup.value.endLicenseValidity.getTime();
    this.fullFormGroup.value.lastAccreditation = this.fullFormGroup.value.lastAccreditation.getTime();
    this.fullFormGroup.value.startAccreditationValidity = this.fullFormGroup.value.startAccreditationValidity.getTime();
    this.fullFormGroup.value.endAccreditationValidity = this.fullFormGroup.value.endAccreditationValidity.getTime();
    this.resourceFormGroup.value.equipment = parseInt(this.resourceFormGroup.value.equipment);
    this.resourceFormGroup.value.medicamentEquipment = parseInt(this.resourceFormGroup.value.medicamentEquipment);

    let institution = Object.assign({},
      this.mainFormGroup.value,
      this.contactFormGroup.value,
      this.resourceFormGroup.value,
      this.fullFormGroup.value,
      
    );
    if (this.parentId)
      institution.controlledBy = this.parentId;

    if (institution.institutionType === "село") {
      institution.population = this.villageFormGroup.value.population
      institution.type = 4;
    }
    else
      institution.type = parseInt('' + this.type);

    this.institutionService.create(institution);
    this.router.navigate(['']);
  }

}
