import { Observable } from 'rxjs';

export interface PaymentOption {
  id: string;
  name: string;
}

export interface HealthInsurance {
  id: string;
  name: string;
}

export interface ClinicUnit {
  id: string;
  name: string;
  street: string;
  city: string;
  open: string;
  city_id: string;
}

export interface SpecialityDoctor {
  id: string;
  speciality_id: string;
  speciality_name: string;
  speciality_slug: string;
}

export interface DoctorComment {
  doctor_id: string;
  comment_id: string;
  avatar: string;
  name: string;
  date: string;
  stars: number;
  text: string;
}

/** Linha da tabela doctor_services_by_health_and_speciality */
export interface DoctorService {
  health_insurance_id: string;
  health_insurance_name: string;
  speciality_id: string;
  speciality_name: string;
  doctor_id: string;
  price: number;
  age: string;
  exam_id: string;
  exam_type: string;
}

export interface DoctorProfile {
  id: string;
  slug: string;
  email: string;
  password: string;
  name: string;
  phone: string;
  crm: string;
  photo: string;
  stat_number: number;
  experience: number;
  description: string;
  rating: number;
  patient_number: number;
  specialties: SpecialityDoctor[];
  payments: PaymentOption[];
  units: ClinicUnit[];
  health: HealthInsurance[];
}

export interface IPerfilService {
  getDoctor(slug: string): Observable<DoctorProfile>;
  getComments(doctorId: string): Observable<DoctorComment[]>;
  getServices(doctorId: string): Observable<DoctorService[]>;
}