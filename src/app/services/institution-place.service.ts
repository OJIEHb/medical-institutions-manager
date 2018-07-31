import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class InstitutionPlaceService {

  private institutionPlacesPath: string = '/institution-places';

  private institutionPlaces: AngularFireList<any> = null;

  constructor(private db: AngularFireDatabase) {
    this.institutionPlaces = db.list(this.institutionPlacesPath);
  }

  public getByGroup(): Observable<any[]> {
    return this.institutionPlaces.valueChanges()
      .pipe(map(places => {
        let groups = {};
        places.forEach(place => {
          if (!groups[place.group])
            groups[place.group] = { id: place.group, name: place.groupLabel, places: [] };
          groups[place.group].places.push(place);
        })
        return groups;
      }))
      .pipe(map(groups => {
        let keys = Object.keys(groups);
        let groupsArray = [];
        keys.forEach(key => {
          groupsArray.push(groups[key]);
        })
        return groupsArray;
      }))
  }

  public getByRegionType(): Observable<any[]> {
    return this.institutionPlaces.valueChanges()
      .pipe(map(places => {
        let types = [];
        places.forEach(place => {
          if (!types[place.regionType])
            types[place.regionType] = [];
          types[place.regionType].push(place);
        });
        return types;
      }))
  }
}
