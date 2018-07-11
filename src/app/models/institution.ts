import { Contact } from "./contact";
import { License } from "./license";

export class Institution {
    place: string;
    geographicalInstitutionType: string;
    placeType: string;
    fullName: string;
    fullAddress: string;
    email: string;
    phone: string;
    fax: string;
    site: string;
    legalStatus: boolean;
    stateRegisterCode: string;
    classifierObjectCode: string;
    ownership: string;
    legalFormCode: string;
    headDoctor: Contact;
    headDoctorSecretary: Contact;
    receptionOffice: boolean;
    receptionOfficePhone: string;
    registryOffice: boolean;
    registryOfficePhone: string;
    population: number;
    medicalСare: string;
    іnstitutionType: string;
    medicalAidTypes: string[];
    license: License;
    typicalBuilding: boolean;
    coldWaterSupply: boolean;
    hotWaterSupply: boolean; 
}