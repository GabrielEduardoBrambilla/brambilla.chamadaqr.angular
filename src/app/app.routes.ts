import { Routes } from '@angular/router';
import { loginGuard } from './auth/login.guard';
import { AlunoListComponent } from './components/entidads-crud/aluno/aluno-list/aluno-list.component';
import { ChamadaListComponent } from './components/entidads-crud/chamada/chamada-list/chamada-list.component';
import { ProfessorFormComponent } from './components/entidads-crud/professor/professor-form/professor-form.component';
import { ProfessorListComponent } from './components/entidads-crud/professor/professor-list/professor-list.component';
import { QrcodeListComponent } from './components/entidads-crud/qrcode/qrcode-list/qrcode-list.component';
import { TurmaListComponent } from './components/entidads-crud/turma/turma-list/turma-list.component';
import { LoginComponent } from './components/public/login/login.component';
import { LayoutComponent } from './page/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
  },
  {
    path: 'professor',
    component: LayoutComponent,
    canActivate: [loginGuard],
    children: [
      { path: '', pathMatch: 'full', component: ProfessorListComponent },
      {
        path: 'edit/:id',
        pathMatch: 'full',
        component: ProfessorFormComponent,
      },
      { path: 'chamada', pathMatch: 'full', component: ChamadaListComponent },
      {
        path: 'chamada/:id',
        pathMatch: 'full',
        component: QrcodeListComponent,
      },
      { path: 'turma', pathMatch: 'full', component: TurmaListComponent },
    ],
  },
  {
    path: 'aluno',
    component: LayoutComponent,
    children: [{ path: '', pathMatch: 'full', component: AlunoListComponent }],
  },
  {
    path: 'turma',
    component: LayoutComponent,
    children: [{ path: '', pathMatch: 'full', component: TurmaListComponent }],
  },
];
