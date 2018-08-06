import { Injectable } from '@angular/core';
import { Institution } from '../models/institution';
import * as Excel from 'exceljs/dist/exceljs.min';
import { saveAs } from 'file-saver';
import { Observable, of } from '../../../node_modules/rxjs';
import { map } from '../../../node_modules/rxjs/operators';

@Injectable()
export class ExcelService {

  constructor() { }

  public getExcelFromInstitution(institution: Institution) {
    const workbook = new Excel.Workbook();
    let worksheet = workbook.addWorksheet(institution.fullName);
    worksheet.mergeCells('A1:B1');
    worksheet.getCell('A1').value = institution.fullName;
    worksheet.getColumn(1).width = 50;
    worksheet.getColumn(1).alignment = { wrapText: true, vertical: 'center' }
    worksheet.addRow(['Місце розташування']);
    worksheet.addRow(['Рівень підпорядкування']);
    worksheet.addRow(['Тип населеного пункту місця розташування']);
    worksheet.addRow(['Адреса']);
    worksheet.addRow(['Кількість населення, яке офіційно зареєстровано на території обслуговування закладу (постійне на 01.01)']);
    worksheet.addRow(['Кількість населення, яке офіційно зареєстровано в населеному пункті']);
    worksheet.addRow(['Email установи']);
    worksheet.addRow(['Контактний телефон закладу']);
    worksheet.addRow(['Факс']);
    worksheet.addRow(['Сайт в Internet']);
    worksheet.addRow(['Статус юридичної особи']);
    worksheet.addRow(['Код ЄДРПОУ']);
    worksheet.addRow(['Код КОАТУУ']);
    worksheet.addRow(['Форма власності']);
    worksheet.getCell('A1').alignment = { vertical: 'center', horizontal: 'center' };
    workbook.xlsx.writeBuffer().then(data => {
      saveAs(new Blob([data], { type: "application/octet-stream" }), institution.fullName + '.xlsx')
    })
  }
}
