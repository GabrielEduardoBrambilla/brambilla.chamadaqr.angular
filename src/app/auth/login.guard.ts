import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';

export const loginGuard: CanActivateFn = (route, state) => {
  let loginService = inject(LoginService);
  let router = inject(Router);

  // Verificar se está logado
  if (!loginService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  // Verificar permissões específicas por rota
  if (
    state.url.startsWith('/professor') &&
    !loginService.hasRole('PROFESSOR')
  ) {
    window.alert('Sem permissões suficientes!');
    router.navigate(['/aluno']);
    return false;
  }

  return true;
};
