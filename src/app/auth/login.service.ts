import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable, tap } from 'rxjs';
import { Login } from '../models/login/login';
import { LoginResponse } from '../models/login/login-response';
import { Usuario } from './usuario';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  http = inject(HttpClient);
  API = `${environment.apiUrl}/alunos`;

  constructor() {}

  logar(login: Login): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.API, login).pipe(
      tap((response) => {
        // Armazenar apenas o access_token
        this.addToken(response.access_token);
      })
    );
  }

  addToken(token: string) {
    localStorage.setItem('token', token);
  }

  removerToken() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  jwtDecode() {
    let token = this.getToken();
    if (token) {
      return jwtDecode<Usuario>(token);
    }
    return null;
  }

  hasRole(role: string): boolean {
    let user = this.jwtDecode();
    if (!user || !user.realm_access || !user.realm_access.roles) {
      return false;
    }
    return user.realm_access.roles.includes(role);
  }

  getUsuarioLogado(): Usuario | null {
    return this.jwtDecode();
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const user = this.jwtDecode();
      if (!user || !user.exp) return false;
      // Verificar se o token expirou
      return user.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  getUsername(): string {
    const user = this.jwtDecode();
    return user?.preferred_username || '';
  }

  getEmail(): string {
    const user = this.jwtDecode();
    return user?.email || '';
  }

  getRoles(): string[] {
    const user = this.jwtDecode();
    return user?.realm_access?.roles || [];
  }
}
