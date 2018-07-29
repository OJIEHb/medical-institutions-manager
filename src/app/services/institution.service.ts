import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Institution } from '../models/institution';
import { Observable } from 'rxjs';
import { UUID } from 'angular2-uuid';

@Injectable()
export class InstitutionService {

  private institutionPath: string = '/institutions';

  private institutions: AngularFireList<Institution> = null;
  private institution: AngularFireObject<Institution>;

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

  public getById(id: string): Observable<Institution> {
    this.institution = this.db.object(this.institutionPath + '/' + id)
    return this.institution.valueChanges();
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

  public getHierarchy(institutions: Institution[]): Institution[] {
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
  }
}