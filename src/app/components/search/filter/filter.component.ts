import { Component, Output, EventEmitter } from '@angular/core';
import { InstitutionPlaceService } from '../../../services/institution-place.service';
import { FormDataService } from '../../../services/form-data.service';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {

  @Output() filtered = new EventEmitter<any>();

  public placeGroups: any;
  public formData: any;

  private filter = {};

  constructor(private placeService: InstitutionPlaceService, private formDataService: FormDataService) {
    this.placeService.getAll().subscribe(groups => this.placeGroups = groups);
    this.formDataService.getFormData().subscribe(formData => this.formData = formData)
  }

  public onSingleFilterClick(isChecked: boolean, key: string, value: any) {
    if (isChecked) {
      if (!this.filter[key])
        this.filter[key] = [];
      this.filter[key].push(value);
    }
    else {
      let index = this.filter[key].indexOf(value);
      this.filter[key].splice(index, 1);
    }
    this.filtered.emit(this.filter);
  }
}
