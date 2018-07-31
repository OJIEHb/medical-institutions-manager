import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class InstitutionPlaceService {

  private institutionPlacesPath: string = '/institution-places';

  private institutionPlaces: AngularFireList<any> = null;

  constructor(private db: AngularFireDatabase) {
    this.institutionPlaces = db.list(this.institutionPlacesPath);
  }
}
