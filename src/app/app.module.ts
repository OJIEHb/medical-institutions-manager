import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from './../environments/environment';
import { AppComponent } from './app.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from './meterial.module';
import { RouterModule } from '@angular/router';
import { AddInstitutionComponent } from './components/add-institution/add-institution.component';
import { InstitutionService } from './services/institution.service';
import { InstitutionListComponent } from './components/institution-list/institution-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AddInstitutionComponent,
    InstitutionListComponent,
  ],
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        component: AddInstitutionComponent
      }
    ]),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    LayoutModule,
    MaterialModule
  ],
  providers: [InstitutionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
