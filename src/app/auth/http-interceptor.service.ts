import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const meuhttpInterceptor: HttpInterceptorFn = (request, next) => {
  let router = inject(Router);
  let token = localStorage.getItem('token');

  // Não adicionar token na requisição de login
  if (token && !request.url.includes('/auth/login')) {
    request = request.clone({
      setHeaders: { Authorization: 'Bearer ' + token },
    });
  }

  return next(request).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          alert('Sessão expirada! Faça login novamente.');
          localStorage.removeItem('token');
          router.navigate(['/login']);
        } else if (err.status === 403) {
          alert('Acesso negado! Você não tem permissão.');
          console.warn(err.message);
          console.warn(err);
          router.navigate(['/login']);
        } else {
          console.error('HTTP error:', err);
          console.warn(err.message);
          console.warn(err.type);
          console.warn(err.status);
        }
      } else {
        console.error('An error occurred:', err);
      }

      return throwError(() => err);
    })
  );
};
