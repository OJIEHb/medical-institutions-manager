import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from './meterial.module';
import { RouterModule } from '@angular/router';
import { AddInstitutionComponent } from './components/add-institution/add-institution.component';
import { InstitutionService } from './services/institution.service';
import { InstitutionListComponent } from './components/institution-list/institution-list.component';
import { InstitutionHierarchyComponent } from './components/institution-hierarchy/institution-hierarchy.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard';
import { LoginComponent } from './components/login/login.component';
import { RemoveInstitutionDialogComponent } from './components/institution-hierarchy/remove-institution-dialog/remove-institution-dialog.component';
import { routes } from './routes';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InstitutionPlaceService } from './services/institution-place.service';
import { DatePipe } from '@angular/common';
import { InstitutionComponent } from './components/institution/institution.component';
import { SearchComponent } from './components/search/search.component';
import { FilterComponent } from './components/search/filter/filter.component';
import { FormDataService } from './services/form-data.service';
import { Ng5SliderModule } from 'ng5-slider';
import { MAT_DATE_LOCALE } from '@angular/material';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { ExcelService } from './services/excel.service';

@NgModule({
  declarations: [
    AppComponent,
    AddInstitutionComponent,
    InstitutionListComponent,
    InstitutionHierarchyComponent,
    LoginComponent,
    RemoveInstitutionDialogComponent,
    DashboardComponent,
    InstitutionComponent,
    SearchComponent,
    FilterComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    LayoutModule,
    MaterialModule,
    Ng5SliderModule,
    HttpClientModule
  ],
  providers: [
    InstitutionService,
    AuthService,
    AuthGuard,
    InstitutionPlaceService,
    DatePipe,
    FormDataService,
    { provide: MAT_DATE_LOCALE, useValue: 'ua-UA' },
    ExcelService
  ],
  entryComponents: [RemoveInstitutionDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
