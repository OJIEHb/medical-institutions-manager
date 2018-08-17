import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { InstitutionService } from '../../services/institution.service';
import { Institution } from '../../models/institution';
import { Router } from '@angular/router';
import { FilterComponent } from './filter/filter.component';
import { MatPaginator } from '../../../../node_modules/@angular/material';
import { ExcelService } from '../../services/excel/excel.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  @ViewChild('filter') filterComponent: FilterComponent;
  @ViewChild('paginator') paginator: MatPaginator;

  public filtredInstitutions: Institution[];
  public filterData = {
    totalPopulation: { type: 'range', min: 0, max: 0 },
    vehiclesReality: { type: 'range', min: 0, max: 0 },
    computerEquipmentReality: { type: 'range', min: 0, max: 0 }
  };
  public search: string;
  public showFilter = true;
  public paginatedInstitutions: Institution[];
  public pageSize = 10;

  private originalInstitutions: Institution[];
  private filterParam = {};

  constructor(private institutionService: InstitutionService, private router: Router, private changeDetector: ChangeDetectorRef, private excelService: ExcelService) {
    this.institutionService.getAll()
      .subscribe(institutions => {
        this.originalInstitutions = institutions;
        this.getFilterData(institutions);
        this.filter(this.filterParam);
      });
  }

  public onSearchChange() {
    this.filter(this.filterParam);
    this.filtredInstitutions = this.filtredInstitutions
      .filter(institution => institution.fullName.toLowerCase().includes(this.search.toLocaleLowerCase()));
    this.paginator.pageIndex = 0;
    this.paginatedInstitutions = this.filtredInstitutions.slice(0, this.pageSize);
  }

  public onClearSearchClick() {
    this.search = '';
    this.filter(this.filterParam);
  }

  public onInstitutionClick(institution: Institution) {
    this.router.navigate(['/institution', institution.id])
  }

  public onPageChange(page) {
    this.pageSize = page.pageSize;
    this.paginatedInstitutions = this.filtredInstitutions.slice((page.pageIndex * page.pageSize), (page.pageIndex * page.pageSize) + page.pageSize);
  }

  public onFilterChange(filter) {
    this.filterParam = filter;
    this.filter(filter);
    if (this.search)
      this.filtredInstitutions = this.filtredInstitutions
        .filter(institution => institution.fullName.toLowerCase().includes(this.search.toLocaleLowerCase()));
  }

  public getPaginatorLength(): number {
    if (this.filtredInstitutions)
      return this.filtredInstitutions.length;
    return 0;
  }

  public clearFilter() {
    this.showFilter = !this.showFilter;
    this.changeDetector.detectChanges();
    this.showFilter = !this.showFilter;
    this.changeDetector.detectChanges();
    this.filterParam = {};
    this.onSearchChange();
  }

  public saveInstitutionsExcel() {
    this.excelService.getExcelFromFiltredInstitutions(this.filtredInstitutions, this.filterParam);
  }

  private getFilterData(institutions: Institution[]): any {
    this.filterData.totalPopulation.max = Math.max.apply(Math, institutions.map(institution => institution.totalPopulation));
    this.filterData.vehiclesReality.max = Math.max.apply(Math, institutions.map(institution => institution.vehiclesReality));
    this.filterData.computerEquipmentReality.max = Math.max.apply(Math, institutions.map(institution => institution.computerEquipmentReality));
  }

  private filter(filter) {
    let filtred = this.originalInstitutions;
    Object.keys(filter).forEach(key => {
      switch (filter[key].type) {
        case 'single':
          filtred = filtred.filter(institution => {
            return filter[key].value.length ? filter[key].value.includes(institution[key]) : true;
          });
          break;
        case 'multi':
          filtred = filtred.filter(institution => {
            if (institution[key] && filter[key].value.length)
              return institution[key].reduce((acc, val) => filter[key].value.includes(val) ? true : acc, false)
            return filter[key].value.length ? false : true;
          });
          break;
        case 'range':
          filtred = filtred.filter(institution => {
            if (filter[key].min || filter[key].max) {
              if (filter[key].min && filter[key].max) {
                return institution[key] >= filter[key].min && institution[key] <= filter[key].max;
              } else if (filter[key].min) {
                return institution[key] >= filter[key].min;
              } else {
                return institution[key] <= filter[key].max;
              }
            } else
              return true;
          });
          break;
      }
    })
    this.filtredInstitutions = filtred;
    this.paginator.pageIndex = 0;
    this.paginatedInstitutions = this.filtredInstitutions.slice(0, this.pageSize);
  }
}
