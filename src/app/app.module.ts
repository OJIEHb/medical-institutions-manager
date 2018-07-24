import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
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

@NgModule({
  declarations: [
    AppComponent,
    AddInstitutionComponent,
    InstitutionListComponent,
    InstitutionHierarchyComponent,
    LoginComponent,
  ],
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        component: InstitutionHierarchyComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'institutions/add',
        component: AddInstitutionComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'institutions',
        component: InstitutionListComponent
      }
    ]),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    LayoutModule,
    MaterialModule
  ],
  providers: [
    InstitutionService, 
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
