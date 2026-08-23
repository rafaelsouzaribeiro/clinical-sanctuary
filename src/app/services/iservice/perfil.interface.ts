import { Observable } from 'rxjs';
import {SelectOption } from '../../select-event-location/interface.sellect-option';

export interface Servico {
  id: string;
  label: string;
  price: string;
}

export interface Convenio {
  value: string;
  label: string;
}

export interface Unidade {
  value: string;
  label: string;
  room: string;
  open: string;
}


export interface Comment {
  id: string;
  avatar: string;
  name: string;
  date: string;
  stars: number;
  text: string;
}


export interface DoctorProfile {
  id: string;
  slug: string;
  name: string;
  specialty: string;
  phone: string;
  crm: string;
  photo: string;
  statNumber: number;
  rating: number;
  patientNumber: number;
  experience: number;
  description: string;
  pagamentos: SelectOption[];
  convenios: Convenio[];
  unidades: Unidade[];
  servicos: Servico[];
  comments: Comment[];
}

export interface IPerfileService {
  getDoctor(slug: string): Observable<DoctorProfile[]>;
}

