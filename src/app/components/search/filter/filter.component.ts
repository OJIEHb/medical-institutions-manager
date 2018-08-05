import { Component, Output, EventEmitter, Input } from '@angular/core';
import { InstitutionPlaceService } from '../../../services/institution-place.service';
import { FormDataService } from '../../../services/form-data.service';
import { Institution } from '../../../models/institution';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {

  @Output() filtered = new EventEmitter<any>();

  public placeGroups: any;
  public formData: any;

  private filter = {
    totalPopulation: { type: 'range', min: 0, max: 5000 },
    vehiclesReality: { type: 'range', min: 0, max: 200 },
    computerEquipmentReality: { type: 'range', min: 0, max: 200 },
  };

  constructor(private placeService: InstitutionPlaceService, private formDataService: FormDataService) {
    this.placeService.getAll().subscribe(groups => this.placeGroups = groups);
    this.formDataService.getFormData().subscribe(formData => this.formData = formData)
  }

  public onMultiFilterClick(isChecked: boolean, key: string, value: any, type: string) {
    if (isChecked) {
      if (!this.filter[key])
        this.filter[key] = { type: type || 'single', value: [] };
      this.filter[key].value.push(value);
    }
    else {
      let index = this.filter[key].value.indexOf(value);
      this.filter[key].value.splice(index, 1);
    }
    this.filtered.emit(this.filter);
  }

  public onRangeFilterChange() {
    this.filtered.emit(this.filter);
  }
}
