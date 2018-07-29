import { InstitutionHierarchyComponent } from "./app/components/institution-hierarchy/institution-hierarchy.component";
import { LoginComponent } from "./app/components/login/login.component";
import { AddInstitutionComponent } from "./app/components/add-institution/add-institution.component";
import { AuthGuard } from "./app/services/auth-guard";
import { InstitutionListComponent } from "./app/components/institution-list/institution-list.component";

export const routes = [
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
        path: 'institutions/edit/:id',
        component: AddInstitutionComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'institutions',
        component: InstitutionListComponent
    }
]