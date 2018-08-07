import { Contact } from "./contact";

export class Institution {
  id: string;
  place: string;
  subordinationLevel: string;
  placeType: string;
  regionType: number;
  fullName: string;
  fullAddress: string;
  institutionType: string;
  email: string;
  phone: string;
  fax: string;
  site: string;
  legalStatus: boolean;
  stateRegisterCode: string;
  classifierObjectCode: string;
  ownership: string;
  legalFormCode: string;
  headDoctorName:string;
  headDoctorWorkPhone:string;
  headDoctorMobile:string;
  secretaryHeadDoctorName:string;
  secretaryHeadDoctorPhone:string;
  // headDoctor: Contact;
  // headDoctorSecretary: Contact;
  receptionOffice: boolean;
  receptionOfficePhone: string;
  registryOffice: boolean;
  registryOfficePhone: string;
  population: number;
  totalPopulation: number;
  medicalCare: string;
  іnstitutionType: string;
  medicalAidTypes: string[];
  declaredAssistanceForms: string;
  license: boolean;
  licenseNumber: string;
  licenseDate: Date;
  startLicenseValidity: Date;
  endLicenseValidity: Date;
  accreditationCategoryType: string;
  accreditationCategoryNumber: string;
  lastAccreditation: Date;
  startAccreditationValidity: Date;
  endAccreditationValidity: Date;
  hospitalBedsNumber: number;
  hospitalCapacity: number;
  regularDoctorNumber: number;
  busyDoctorNumber: number;
  individualsDoctorNumber: number;
  middleRegularPersonalNumber: number;
  middleBusyPersonalNumber: number;
  middleIndividualsPersonalNumber: number;
  otherRegularPersonalNumber: number;
  otherBusyPersonalNumber: number;
  otherIndividualsPersonalNumber: number;
  totalRegularPersonalNumber: number;
  totalBusyPersonalNumber: number;
  totalIndividualsPersonalNumber: number;
  heatingType: string;
  typicalBuilding: boolean;
  coldWaterSupply: boolean;
  hotWaterSupply: boolean;
  internetSupply: boolean;
  equipment: number;
  medicamentEquipment: number;
  vehiclesNeed: number;
  vehiclesReality: number;
  vehiclesWay: number;
  computerEquipmentNeed: number;
  computerEquipmentReality: number;
  controlledInstitutions: Institution[];
  controlledBy: string;
  type: number;

  public getRegionType(): number {
    switch (this.place) {
      case 'м. Черкаси':
        return 1;
      case 'м. Сміла':
      case 'м. Умань':
      case 'м. Ватутіне':
        return 2;
      case 'Обласні заклади охорони здоров’я':
        return 4;
      case 'Навчальні медичні заклади':
        return 5;
      default:
        return 3;
    }
  }
}