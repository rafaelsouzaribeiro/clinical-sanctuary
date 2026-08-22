import { Observable } from 'rxjs';
import { SelectCidades } from '../../home/cidades/cidades.interface';

export interface Doctor {
  id: string;
  slug: string;
  acronym: string;
  name: string;
  status: string;
  specialty: string;
  phone: string;
  unidade: Array<{
    address: string;
    city: string;
    uf: string;
  }>;
  crm: string;
  cityId: string;
}

export interface IHomeService {
  getDoctors(id:string): Observable<Doctor[]>;
  getUfOptions(): Observable<SelectCidades[]>;
  getCityOptions(uf: string): Observable<SelectCidades[]>;
}