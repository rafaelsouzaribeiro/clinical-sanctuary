import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import BASEURL from '../../../app.api';
import { DoctorProfile } from '../iservice/perfil.interface';

@Injectable({
  providedIn: 'root',
})
export class PerfilService {
  constructor(private http: HttpClient) {}

  getDoctor(slug: string): Observable<DoctorProfile> {
      const url = `${BASEURL}/doctorProfile?slug=${slug}`;

      return this.http.get<DoctorProfile[]>(url).pipe(
        map((lista) => {
          return lista[0]; 
        })
      );
    }
}