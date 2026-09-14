import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,map } from 'rxjs';
import { 
  Doctor, 
  DoctorComment, 
  AvailableTimeSlot, 
  DoctorServiceByHealthAndSpeciality 
} from '../iservice/consultas.interface';
import BASEURL from '../../../app.api';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {
  constructor(private http: HttpClient) {}

  getDoctorByID(id: string): Observable<Doctor> {
    
    return this.http.get<Doctor[]>(`${BASEURL}/doctors?id=${id}`).pipe(
      map((lista) => lista[0])
    );
  }

  getDoctorComments(doctorId: string): Observable<DoctorComment[]> {
    return this.http.get<DoctorComment[]>(`${BASEURL}/doctor_comments?doctor_id=${doctorId}`);
  }

  getAvailableTimes(doctorId: string): Observable<AvailableTimeSlot[]> {
    return this.http.get<AvailableTimeSlot[]>(`${BASEURL}/availableTimes?doctor_id=${doctorId}`);
  }

  getServiceDetails(doctorId: string, healthId: string, specialtyId: string): Observable<DoctorServiceByHealthAndSpeciality[]> {
    return this.http.get<DoctorServiceByHealthAndSpeciality[]>(
      `${BASEURL}/doctor_services_by_health_and_speciality?doctor_id=${doctorId}&health_insurance_id=${healthId}&speciality_id=${specialtyId}`
    );
  }
}