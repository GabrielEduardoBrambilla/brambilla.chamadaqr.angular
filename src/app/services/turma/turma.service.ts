import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Turma } from '../../models/turma/turma';

@Injectable({
  providedIn: 'root',
})
export class TurmaService {
  http = inject(HttpClient);

  API = 'http://localhost:8080/turmas';

  constructor() {}

  findAll(): Observable<Turma[]> {
    return this.http.get<Turma[]>(this.API + '/findAll');
  }
  customSearch(): Observable<Turma[]> {
    return this.http.get<Turma[]>(this.API + '/search');
  }
  save(turma: Turma): Observable<string> {
    return this.http.post<string>(this.API + '/save', turma, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'text' as 'json',
    });
  }

  findById(id: number): Observable<Turma> {
    return this.http.get<Turma>(this.API + '/findById/' + id);
  }

  findByNome(nome: string): Observable<Turma[]> {
    let par = new HttpParams().set('nome', nome);

    return this.http.get<Turma[]>(this.API + '/findByNome', {
      params: par,
    });
  }

  deleteById(id: number): Observable<string> {
    return this.http.delete<string>(this.API + `/deleteById/${id}`, {
      responseType: 'text' as 'json',
    });
  }

  update(turma: Turma, id: number): Observable<string> {
    return this.http.put<string>(this.API + `/update/${id}`, turma, {
      responseType: 'text' as 'json',
    });
  }
}
