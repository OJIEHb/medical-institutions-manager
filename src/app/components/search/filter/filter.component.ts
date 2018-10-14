import { Component, Output, EventEmitter, Input } from '@angular/core';
import { InstitutionPlaceService } from '../../../services/institution-place.service';
import { FormDataService } from '../../../services/form-data.service';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  
  @Input() data: any;
  @Output() filtered = new EventEmitter<any>();

  public placeGroups: any;
  public formData: any;

  public filter = {};

  public rangeData = {
    totalPopulation: { min: 0, max: 0 },
    vehiclesReality: { min: 0, max: 0 },
    computerEquipmentReality: { min: 0, max: 0 },
  };

  constructor(private placeService: InstitutionPlaceService, private formDataService: FormDataService) {
    this.placeService.getAll().subscribe(groups => this.placeGroups = groups);
    this.formDataService.getFormData().subscribe(formData => this.formData = formData);
    this.filtered.emit(this.filter);
  }

  public onSingleFilterClick(isChecked: boolean, key: string, value: any) {
    if (isChecked) {
      if (!this.filter[key])
        this.filter[key] = { type: 'single', value: [] };
      this.filter[key].value.push(value);
    }
    else {
      const index = this.filter[key].value.indexOf(value);
      this.filter[key].value.splice(index, 1);
    }
    this.filtered.emit(this.filter);
  }

  public onMultiFilterClick(isChecked: boolean, key: string, value: any) {
    if (isChecked) {
      if (!this.filter[key])
        this.filter[key] = { type: 'multi', value: [] };
      this.filter[key].value.push(value);
    }
    else {
      const index = this.filter[key].value.indexOf(value);
      this.filter[key].value.splice(index, 1);
    }
    this.filtered.emit(this.filter);
  }

  public onRangeFilterChange(key: string) {
    this.filter[key] = { type: 'range', min: this.rangeData[key].min || 0, max: this.rangeData[key].max || 0 };
    this.filtered.emit(this.filter);
  }
}
