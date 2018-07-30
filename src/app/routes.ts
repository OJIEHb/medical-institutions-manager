import { InstitutionHierarchyComponent } from "./components/institution-hierarchy/institution-hierarchy.component";
import { LoginComponent } from "./components/login/login.component";
import { AddInstitutionComponent } from "./components/add-institution/add-institution.component";
import { AuthGuard } from "./services/auth-guard";
import { InstitutionListComponent } from "./components/institution-list/institution-list.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";

export const routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'institutions/add',
        component: AddInstitutionComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'institutions/edit/:id',
        component: AddInstitutionComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'institutions',
        component: InstitutionListComponent
    }
]