import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';

export const loginGuard: CanActivateFn = (route, state) => {
  let loginService = inject(LoginService);
  let roteador = inject(Router);

  if (state.url == '/professor' && !loginService.hasRole('PROFESSOR')) {
    window.alert('Sem premissões suficientes!');
    roteador.navigate(['/aluno']);
    return false;
  }

  return true;
};
