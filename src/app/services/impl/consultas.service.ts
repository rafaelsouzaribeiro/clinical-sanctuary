import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import BASEURL from '../../../app.api';
import {
  DoctorProfile,
  AvailableTime,
} from '../iservice/consultas.interface';

@Injectable({
  providedIn: 'root',
})
export class ConsultasService {
  constructor(private http: HttpClient) {}

  getDoctorProfile(id: string): Observable<DoctorProfile> {
    return this.http
      .get<DoctorProfile[]>(`${BASEURL}/doctorProfile?id=${id}`)
      .pipe(map((list) => list[0]));
  }


  getAvailableTimes(idDoctor: string): Observable<AvailableTime[]> {
    return this.http.get<AvailableTime[]>(
      `${BASEURL}/availableTimes?idDoctor=${idDoctor}`
    );
  }
}