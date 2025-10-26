import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { Professor } from '../../models/professor/professor';

@Injectable({
  providedIn: 'root',
})
export class ProfessorService {
  http = inject(HttpClient);

  API = `${environment.apiUrl}/professores`;

  constructor() {}

  findAll(): Observable<Professor[]> {
    return this.http.get<Professor[]>(this.API + '/findAll');
  }
  customSearch(): Observable<Professor[]> {
    return this.http.get<Professor[]>(this.API + '/search');
  }

  save(professor: Professor): Observable<string> {
    return this.http.post<string>(this.API + '/save', professor, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'text' as 'json',
    });
  }

  findById(id: number): Observable<Professor> {
    return this.http.get<Professor>(this.API + '/findById/' + id);
  }

  findByNome(nome: string): Observable<Professor[]> {
    let par = new HttpParams().set('nome', nome);

    return this.http.get<Professor[]>(this.API + '/findByNome', {
      params: par,
    });
  }

  deleteById(id: number): Observable<string> {
    return this.http.delete<string>(this.API + `/deleteById/${id}`, {
      responseType: 'text' as 'json',
    });
  }

  update(professor: Professor, id: number): Observable<string> {
    console.log(professor);
    console.log(professor);

    return this.http.put<string>(this.API + `/update/${id}`, professor, {
      responseType: 'text' as 'json',
    });
  }
}
