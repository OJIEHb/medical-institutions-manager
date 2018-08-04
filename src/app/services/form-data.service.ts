import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '../../../node_modules/angularfire2/database';
import { Observable } from '../../../node_modules/rxjs';

@Injectable()
export class FormDataService {

  private formDataPath: string = '/form-data';
  private formData: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { 
    this.formData = this.db.object(this.formDataPath);
  }

  public getFormData(): Observable<any> {
    return this.formData.valueChanges();
  }
}
