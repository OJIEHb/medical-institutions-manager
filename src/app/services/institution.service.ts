import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Institution } from '../models/institution';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { UUID } from 'angular2-uuid';

@Injectable()
export class InstitutionService {

  private institutionPath: string = '/institutions';

  private institutions: AngularFireList<Institution> = null;

  constructor(private db: AngularFireDatabase) {
    this.institutions = db.list(this.institutionPath);
  }

  public create(institution: Institution): string {
    let id = UUID.UUID();
    institution.id = id;
    this.institutions.set(id, institution);
    return id;
  }

  public update(id: string, institution: Institution) {
    this.institutions.set(id, institution)
  }

  public getAll(): Observable<Institution[]> {
    return this.institutions.valueChanges();
  }

  public delete(institution: Institution) {
    //TODO: Remove children
    this.institutions.remove(institution.id);
  }

  public getHierarchy(): Observable<Institution[]> {
    return this.institutions.valueChanges()
      .pipe(map(institutions => {
        //TODO: move this to firebase side
        institutions.sort((a, b) => {
          return a.type > b.type ? -1 : a.type < b.type ? 1 : 0;
        });
        for (let i = 0; i < institutions.length; i++) {
          if (institutions[i].controlledBy) {
            let parentIndex = institutions.findIndex(parentInstitution => parentInstitution.id === institutions[i].controlledBy);
            if (!institutions[parentIndex].controlledInstitutions) {
              institutions[parentIndex].controlledInstitutions = [];
            }
            institutions[parentIndex].controlledInstitutions.push(institutions[i]);
            institutions.splice(i, 1);
            i--;
          }
        }
        return institutions;
      }))
  }
}