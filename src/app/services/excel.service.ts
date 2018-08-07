import { Injectable } from '@angular/core';
import { Institution } from '../models/institution';
import * as Excel from 'exceljs/dist/exceljs.min';
import { saveAs } from 'file-saver';
import { Observable, of } from '../../../node_modules/rxjs';
import { map } from '../../../node_modules/rxjs/operators';
import { getLocaleDateFormat, NgIf } from '../../../node_modules/@angular/common';

@Injectable()
export class ExcelService {

  constructor() { }

  public getExcelFromInstitution(institution: Institution) {
    const workbook = new Excel.Workbook();
    let worksheet = workbook.addWorksheet(institution.fullName);
    worksheet.mergeCells('A1:B1');
    worksheet.getCell('A1').value = institution.fullName;
    worksheet.getColumn(1).width = 55;
    worksheet.getColumn(2).width = 55;
    worksheet.getColumn(1).alignment = { vertical: 'center', wrapText: true }
    worksheet.getColumn(2).alignment = { vertical: 'center', horizontal: 'left', wrapText: true }
    worksheet.addRow(['Місце розташування', institution.place]);
    worksheet.addRow(['Рівень підпорядкування', institution.subordinationLevel]);
    worksheet.addRow(['Тип населеного пункту місця розташування', institution.placeType]);
    worksheet.addRow(['Адреса', institution.fullAddress]);
    worksheet.addRow(['Кількість населення, яке офіційно зареєстровано на території обслуговування закладу (постійне на 01.01)', institution.totalPopulation]);
    worksheet.addRow(['Кількість населення, яке офіційно зареєстровано в населеному пункті', institution.population]);
    worksheet.addRow(['Email установи', institution.email]);
    worksheet.addRow(['Контактний телефон закладу', institution.phone]);
    worksheet.addRow(['Факс', institution.fax]);
    worksheet.addRow(['Сайт в Internet', institution.site]);
    worksheet.addRow(['Статус юридичної особи', institution.legalStatus]);
    worksheet.addRow(['Код ЄДРПОУ', institution.stateRegisterCode]);
    worksheet.addRow(['Код КОАТУУ', institution.classifierObjectCode]);
    worksheet.addRow(['Форма власності', institution.ownership]);
    worksheet.addRow(['Код організаційно-правової форми (КОПФ)', institution.legalFormCode]);
    worksheet.addRow(['ПІП головного лікаря (заступника)', institution.headDoctorName]);
    worksheet.addRow(['Робочий телефон', institution.headDoctorWorkPhone]);
    worksheet.addRow(['Мобільний телефон', institution.headDoctorMobile]);
    worksheet.addRow(['ПІП секретаря головного лікаря', institution.secretaryHeadDoctorName]);
    worksheet.addRow(['Робочий телефон', institution.secretaryHeadDoctorPhone]);
    worksheet.addRow(['Приймальне відділення', institution.receptionOffice]);
    worksheet.addRow(['Телефон', institution.receptionOfficePhone]);
    worksheet.addRow(['Реєстратура амбулаторно-поліклінічного підрозділу', institution.registryOffice]);
    worksheet.addRow(['Телефон', institution.registryOfficePhone]);
    worksheet.addRow(['Рівень надання медичної допомоги', institution.medicalCare]);
    worksheet.addRow(['Планова ємність']);
    worksheet.addRow(['Кількість ліжок стаціонару', institution.hospitalBedsNumber]);
    worksheet.addRow(['Планова ємність амбулаторно-поліклінічного підрозділу', institution.hospitalCapacity]);
    worksheet.addRow(['Тип закладу', institution.institutionType]);
    worksheet.addRow(['Види меддопомоги, які надає ЗОЗ', institution.medicalAidTypes]);
    worksheet.addRow(['Наявність ліцензії', institution.license]);
    worksheet.addRow(['№', institution.licenseNumber]);
    worksheet.addRow(['Дата', new Date(institution.licenseDate)]);
    worksheet.addRow(['Термін дії з', new Date(institution.startLicenseValidity)]);
    worksheet.addRow(['по', new Date(institution.endLicenseValidity)]);
    worksheet.addRow(['Задекларовані види допомоги', institution.declaredAssistanceForms]);
    worksheet.addRow(['Акредитаціна категорія', institution.accreditationCategoryType]);
    worksheet.addRow(['№', institution.accreditationCategoryNumber]);
    worksheet.addRow(['Дата останньої акредитації', new Date(institution.lastAccreditation)]);
    worksheet.addRow(['Термін дії з', new Date(institution.startAccreditationValidity)]);
    worksheet.addRow(['по', new Date(institution.endAccreditationValidity)]);
    worksheet.addRow(['Ресурси закладу']);
    worksheet.addRow(['Всього посад']);
    worksheet.addRow(['Штатні']);
    worksheet.addRow(['Зайняті']);
    worksheet.addRow(['Фізичні особи']);
    worksheet.addRow(['Лікарі']);
    worksheet.addRow(['Штатні', institution.regularDoctorNumber]);
    worksheet.addRow(['Зайняті', institution.busyDoctorNumber]);
    worksheet.addRow(['Фізичні особи',institution.individualsDoctorNumber]);
    worksheet.addRow(['Середній м/п', institution.middleRegularPersonalNumber]);
    worksheet.addRow(['Штатні']);
    worksheet.addRow(['Зайняті', institution.middleBusyPersonalNumber]);
    worksheet.addRow(['Фізичні особи', institution.middleIndividualsPersonalNumber]);
    worksheet.addRow(['Інший персонал']);
    worksheet.addRow(['Штатні', institution.otherRegularPersonalNumber]);
    worksheet.addRow(['Зайняті', institution.otherBusyPersonalNumber]);
    worksheet.addRow(['Фізичні особи', institution.otherIndividualsPersonalNumber]);
    worksheet.addRow(['Характеристика забудови (типовий проект)', institution.typicalBuilding]);
    worksheet.addRow(['Опалення', institution.heatingType]);
    worksheet.addRow(['Наявність централізованого холодного водопостачання', institution.coldWaterSupply]);
    worksheet.addRow(['Наявність гарячого водопостачання', institution.hotWaterSupply]);
    worksheet.addRow(['Оснащеність медичним обладнанням та інвентарем', institution.equipment + " %"]);
    worksheet.addRow(['Забезпеченість медикаментами для надання невідкладної допомоги', institution.medicamentEquipment + " %"]);
    worksheet.addRow(['Транспортні засоби']);
    worksheet.addRow(['Потреба (кількість)', institution.vehiclesNeed]);
    worksheet.addRow(['Наявність (кількість)', institution.vehiclesReality]);
    worksheet.addRow(['В т.ч. на ходу', institution.vehiclesWay]);
    worksheet.addRow(['Наявність доступу до мережі Internet', institution.internetSupply]);
    worksheet.addRow(['Забезпеченість ЗОЗ комп. технікою']);
    worksheet.addRow(['Потреба (кількість)', institution.computerEquipmentNeed]);
    worksheet.addRow(['Наявність (кількість)', institution.computerEquipmentReality]);
    worksheet.getCell('A1').alignment = { vertical: 'center', horizontal: 'center' };
    workbook.xlsx.writeBuffer().then(data => {
      saveAs(new Blob([data], { type: "application/octet-stream" }), institution.fullName + '.xlsx')
    })
  }
}
