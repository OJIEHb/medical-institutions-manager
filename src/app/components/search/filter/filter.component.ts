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

  private filter = {
    place: []
  };

  constructor(private placeService: InstitutionPlaceService, private formDataService: FormDataService) {
    this.placeService.getAll().subscribe(groups => this.placeGroups = groups);
    this.formDataService.getFormData().subscribe(formData => this.formData = formData)
  }

  public onMultiFilterClick(isChecked: boolean, key: string, value: any) {
    if (isChecked)
      this.addMultiFiler(key, value);
    else
      this.removeMultiFiler(key, value);
    this.filtered.emit(this.filter);
  }

  private addMultiFiler(key: string, value: any) {
    this.filter[key].push(value);
  }

  private removeMultiFiler(key: string, value: any) {
    let index = this.filter[key].indexOf(value);
    this.filter[key].splice(index, 1);
  }


}
