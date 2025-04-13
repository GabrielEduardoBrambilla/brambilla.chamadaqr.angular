import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chamada } from '../../models/chamada/chamada';

@Injectable({
  providedIn: 'root',
})
export class ChamadaService {
  http = inject(HttpClient);

  API = 'http://localhost:8080/chamada';

  constructor() {}

  findAll(): Observable<Chamada[]> {
    return this.http.get<Chamada[]>(this.API + '/findAll');
  }

  findById(id: number): Observable<Chamada> {
    return this.http.get<Chamada>(this.API + '/findById/' + id);
  }

  findByNome(nome: string): Observable<Chamada[]> {
    let par = new HttpParams().set('nome', nome);

    return this.http.get<Chamada[]>(this.API + '/findByNome', { params: par });
  }

  deleteById(id: number): Observable<string> {
    return this.http.delete<string>(this.API + '/deleteById/' + id, {
      responseType: 'text' as 'json',
    });
  }

  save(chamada: Chamada): Observable<string> {
    return this.http.post<string>(this.API + '/save', chamada, {
      responseType: 'text' as 'json',
    });
  }

  update(chamada: Chamada, id: number): Observable<string> {
    console.log(chamada);
    console.log(chamada);

    return this.http.put<string>(this.API + '/update/' + id, chamada, {
      responseType: 'text' as 'json',
    });
  }
}
