export interface DoctorSpecialty {
  id: string;
  speciality_id: string;
  speciality_name: string;
  speciality_slug: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
}

export interface DoctorUnit {
  id: string;
  name: string;
  street: string;
  city: string;
  open: string;
  city_id: string;
}

export interface HealthInsurance {
  id: string;
  name: string;
}

export interface Doctor {
  id: string;
  slug: string;
  email: string;
  password?: string;
  name: string;
  phone: string;
  crm: string;
  photo: string;
  acronym: string;
  stat_number: number;
  experience: number;
  description: string;
  status: 'Ativo' | 'Inativo';
  rating: number;
  patient_number: number;
  specialties: DoctorSpecialty[];
  payments: PaymentMethod[];
  units: DoctorUnit[];
  health: HealthInsurance[];
  services?: DoctorServiceByHealthAndSpeciality[];
}

export interface DoctorServiceByHealthAndSpeciality {
  health_insurance_id: string;
  health_insurance_name: string;
  speciality_id: string;
  doctor_id: string;
  speciality_name: string;
  price: number;
  age: string;
  exam_id: string;
  exam_type: string;
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



export interface AvailableTimeSlot {
  doctor_id: string;
  date: string; 
  availableTimes: string[];
}