import { Injectable } from '@angular/core';
import { Institution } from '../../models/institution';
import * as Excel from 'exceljs/dist/exceljs.min';
import { saveAs } from 'file-saver';
import { InstitutionExcelService } from './institution-excel.service';

@Injectable()
export class ExcelService {

  constructor(private institutionTemplateService: InstitutionExcelService) { }

  public getExcelFromInstitution(institution: Institution) {
    const workbook = new Excel.Workbook();
    let worksheet = workbook.addWorksheet();

    worksheet.mergeCells('A1:B1');
    worksheet.getCell('A1').value = institution.fullName;

    this.institutionTemplateService.getInstitutionExcelData(institution)
      .forEach(insitutionRow => {
        let row = worksheet.addRow([insitutionRow.label, insitutionRow.value])
        row.getCell(1).alignment = insitutionRow.cellStyle.alignment;
        row.getCell(1).font = insitutionRow.cellStyle.font;
      })

    worksheet.getColumn(1).width = 55;
    worksheet.getColumn(2).width = 55;
    worksheet.getColumn(2).alignment = { vertical: 'center', horizontal: 'left', wrapText: true }
    worksheet.getCell('A1').alignment = { vertical: 'center', horizontal: 'center' };
    worksheet.getCell('A1').font = { bold: true, size: 16, underline: true }
    workbook.xlsx.writeBuffer().then(data => {
      saveAs(new Blob([data], { type: "application/octet-stream" }), institution.fullName + '.xlsx')
    })
  }
}
