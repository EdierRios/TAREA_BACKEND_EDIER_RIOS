// frontend/school-management-frontend/src/app/services/grupo.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {
  private apiUrl = 'http://localhost:3000/api/grupos';

  constructor(private http: HttpClient) {}

  getGrupos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createGrupo(grupo: any): Observable<any> {
    return this.http.post(this.apiUrl, grupo);
  }

  getGrupoById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateGrupo(id: number, grupo: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, grupo);
  }

  deleteGrupo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}