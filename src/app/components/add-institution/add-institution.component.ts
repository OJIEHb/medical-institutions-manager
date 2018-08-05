import { Component, OnInit } from '@angular/core';
import { Institution } from '../../models/institution';
import { Router, ActivatedRoute } from '@angular/router';
import { InstitutionService } from '../../services/institution.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InstitutionPlaceService } from '../../services/institution-place.service';
import { FormDataService } from '../../services/form-data.service';

@Component({
  selector: 'add-institution',
  templateUrl: './add-institution.component.html',
  styleUrls: ['./add-institution.component.scss']
})
export class AddInstitutionComponent {

  institutionFormGroup: FormGroup;
  parentId: string;
  type: number;
  place: string;
  institution: Institution;
  isUpdating: boolean;
  placeGroups: any;
  formData: any;

  constructor(private institutionService: InstitutionService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private placeService: InstitutionPlaceService,
    private formDataService: FormDataService) {
    this.route
      .queryParams
      .subscribe(params => {
        this.parentId = params['parent'];
        this.place = params['place'];
        this.type = params['type'] || 1;
      });


    this.initForms();
    this.route.params.subscribe(params => {
      this.isUpdating = params['id'] ? true : false;
      if (params['id'])
        this.institutionService.getById(params['id'])
          .subscribe(institution => {
            this.institution = institution;
            this.institutionFormGroup.patchValue(institution)
          });
    })

    this.formDataService.getFormData().subscribe(data => this.formData = data);

    this.placeService.getByGroup().subscribe(groups => this.placeGroups = groups)
  }

  public saveInstitution() {
    let institution = this.institutionFormGroup.value as Institution;

    if (this.parentId) {
      institution.place = this.place;
      institution.controlledBy = this.parentId;
    }

    institution.regionType = this.getRegionType(institution.place);
    if (institution.institutionType === "село")
      institution.type = 4;
    else
      institution.type = +this.type;

    this.institutionService.create(institution);
    this.router.navigate(['']);
  }

  public updateInstitution() {
    let institution = Object.assign(this.institution, this.institutionFormGroup.value);
    institution.regionType = this.getRegionType(institution.place);
    this.institutionService.update(institution.id, institution);
    this.router.navigate(['']);
  }

  public onFieldDateChange(field: string) {
    let patch = {};
    patch[field] = this.institutionFormGroup.value[field].toISOString();
    this.institutionFormGroup.patchValue(patch);
  }

  private getFiltredTypes() {
    return this.formData.institutionType.filter(item => item.types.includes(+this.type));
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
      medicalCare: [],
      medicalAidTypes: [[]],
      declaredAssistanceForms: [],
      license: false,
      licenseNumber: [],
      licenseDate: [],
      startLicenseValidity: [],
      endLicenseValidity: [],
      accreditationCategoryType: [],
      accreditationCategoryNumber: [],
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
      equipment: ['30'],
      medicamentEquipment: ['30'],
      vehiclesNeed: [0],
      vehiclesReality: [0],
      vehiclesWay: [0],
      computerEquipmentNeed: [0],
      computerEquipmentReality: [0],
      population: [0]
    });
  }

  private getRegionType(institutionPlace: string): number {
    let regionType = 0;
    this.placeGroups.forEach(group => {
      group.places.forEach(place => {
        if (place.name === institutionPlace)
          regionType = place.regionType;
      });
    });
    return regionType;
  }
}
