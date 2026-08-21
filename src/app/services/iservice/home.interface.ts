import { Observable } from 'rxjs';
import { SelectOption } from '../../select-event-location/interface.sellect-option';

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
}

export interface IHomeService {
  getDoctors(): Observable<Doctor[]>;
  getUfOptions(): Observable<SelectOption[]>;
  getCityOptions(uf: string): Observable<SelectOption[]>;
}