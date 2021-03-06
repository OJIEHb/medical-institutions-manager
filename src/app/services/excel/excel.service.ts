import { Injectable } from '@angular/core';
import { Institution } from '../../models/institution';
import * as Excel from 'exceljs/dist/exceljs.min';
import { saveAs } from 'file-saver';
import { InstitutionExcelService } from './institution-excel.service';
import { getHeaders } from './headers';

@Injectable()
export class ExcelService {

  private headers: Map<string, string> = new Map();

  constructor(private institutionTemplateService: InstitutionExcelService) { }

  public getExcelFromInstitution(institution: Institution) {
    const workbook = new Excel.Workbook();
    let worksheet = workbook.addWorksheet();

    worksheet.mergeCells('A1:B1');
    worksheet.getCell('A1').value = institution.fullName;

    this.institutionTemplateService.getInstitutionExcelData(institution)
      .forEach(insitutionRow => {
        const row = worksheet.addRow([insitutionRow.label, insitutionRow.value])
        row.getCell(1).alignment = insitutionRow.cellStyle.alignment;
        row.getCell(1).font = insitutionRow.cellStyle.font;
      });

    worksheet.getColumn(1).width = 55;
    worksheet.getColumn(2).width = 55;
    worksheet.getColumn(2).alignment = { vertical: 'center', horizontal: 'left', wrapText: true }
    worksheet.getCell('A1').alignment = { vertical: 'center', horizontal: 'center' };
    worksheet.getCell('A1').font = { bold: true, size: 16, underline: true }
    workbook.xlsx.writeBuffer().then(data => {
      saveAs(new Blob([data], { type: "application/octet-stream" }), institution.fullName + '.xlsx');
    });
  }

  public getExcelFromFiltredInstitutions(institutions: Institution[]) {
    const workbook = new Excel.Workbook();
    let worksheet = workbook.addWorksheet();
    let headers = Array.from(getHeaders());
    worksheet.addRow(headers.map(([key, value]) => value)).font = { bold: true };
    institutions.forEach(institution => this.addInstitution(institution, worksheet, headers));
    headers.forEach((header, i) => {
      worksheet.getColumn(i + 1).width = 20;
      worksheet.getColumn(i + 1).alignment = { vertical: 'top', wrapText: true }
    });
    worksheet.getColumn(1).width = 50;
    worksheet.getColumn(14).width = 80;
    workbook.xlsx.writeBuffer().then(data => {
      saveAs(new Blob([data], { type: "application/octet-stream" }), 'Медичні заклади.xlsx');
    });
  }

  private addInstitution(institution, worksheet, headers) {
    worksheet.addRow(headers.map(([key, value]) => {
      if (institution[key] === true)
        return 'Так';
      else if (institution[key] === false)
        return '';
      else if (Array.isArray(institution[key]))
        return institution[key] ? institution[key].join(', ') : '-';
      else
        return institution[key];
    }));
    if (institution.controlledInstitutions) {
      institution.controlledInstitutions.forEach(controlledInstitution => {
        this.addInstitution(controlledInstitution, worksheet, headers);
      });
    }
  }
}
