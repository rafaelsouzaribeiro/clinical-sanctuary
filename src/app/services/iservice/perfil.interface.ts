import { Observable } from 'rxjs';
import { Doctor,DoctorComment,DoctorServiceByHealthAndSpeciality } from './consultas.interface';


export interface IPerfilService {
  getDoctor(slug: string): Observable<Doctor>;
  getComments(doctorId: string): Observable<DoctorComment[]>;
  getServices(doctorId: string): Observable<DoctorServiceByHealthAndSpeciality[]>;
}