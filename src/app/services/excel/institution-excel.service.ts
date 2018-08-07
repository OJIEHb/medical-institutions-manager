import { Injectable } from '@angular/core';
import { Institution } from '../../models/institution';
import { getHospitalTemplate } from './templates/hospital-template';
import { getClinicTemplate } from './templates/clinic-template';
import { getFapTemplate } from './templates/fap-template';
import { getVillageTemplate } from './templates/village-template';

@Injectable()
export class InstitutionExcelService {

  public getInstitutionExcelData(institution: Institution) {
    switch (institution.type) {
      case 1:
        return getHospitalTemplate(institution);
      case 2:
        return getClinicTemplate(institution);
      case 3:
        return getFapTemplate(institution);
      case 4:
        return getVillageTemplate(institution);
    }
  }
}
