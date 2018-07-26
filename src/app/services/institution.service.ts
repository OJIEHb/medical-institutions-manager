import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Institution } from '../models/institution';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { UUID } from 'angular2-uuid';
import { element } from '../../../node_modules/protractor';

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
    this.institutions.valueChanges()
      .subscribe(async institutions => {
        await this.deleteControlledInstitutions(institution.id, institutions);
        await this.institutions.remove(institution.id);
      })
  }

  private deleteControlledInstitutions(controlledId: string, institutions: Institution[]) {
    institutions.forEach(async institution => {
      if (institution.controlledBy == controlledId) {
        this.deleteControlledInstitutions(institution.id, institutions);
        await this.institutions.remove(institution.id);
      }
    })
  }

  public getHierarchy(): Observable<Institution[]> {
    return this.institutions.valueChanges()
      .pipe(map(institutions => {
        institutions.sort((a, b) => {
          if (b.type === a.type)
            return a.fullName.toLowerCase() > b.fullName.toLowerCase() ? 1 : a.fullName.toLowerCase() < b.fullName.toLowerCase() ? -1 : 0;
          return b.type - a.type;
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