import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Institution } from '../models/institution';
import { Observable } from 'rxjs';

@Injectable()
export class InstitutionService {

  private institutionPath: string = '/institutions';

  private institutions: AngularFireList <Institution> = null;

  constructor(private db: AngularFireDatabase) {
    this.institutions = db.list(this.institutionPath);
  }

  public addInstitution(institution: Institution): void {
    console.log(institution);
    this.institutions.push(institution);
  }

  getAllInstitutions(): Observable<Institution[]> {
    return this.institutions.valueChanges();
  }
}