import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import BASEURL from '../../../app.api';
import { DoctorComment, DoctorProfile, DoctorService } from '../iservice/perfil.interface';

@Injectable({
  providedIn: 'root',
})
export class PerfilService {
  constructor(private http: HttpClient) {}

  getDoctor(slug: string): Observable<DoctorProfile> {
    const url = `${BASEURL}/doctors?slug=${slug}`;

    return this.http.get<DoctorProfile[]>(url).pipe(
      map((lista) => lista[0])
    );
  }

  getComments(doctorId: string): Observable<DoctorComment[]> {
    const url = `${BASEURL}/doctor_comments?doctor_id=${doctorId}`;
    return this.http.get<DoctorComment[]>(url);
  }

  getServices(doctorId: string): Observable<DoctorService[]> {
    const url = `${BASEURL}/doctor_services_by_health_and_speciality?doctor_id=${doctorId}`;
    return this.http.get<DoctorService[]>(url);
  }
}