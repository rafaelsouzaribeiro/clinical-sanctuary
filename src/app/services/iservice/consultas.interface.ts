
export interface SelectOption {
  value: string;
  label: string;
}

export interface AvailableTime {
  idDoctor: string;
  date: string;
  availableTimes: string[];
}

export interface DoctorProfile {
  id: string;
  slug: string;
  name: string;
  specialty: string;
  phone: string;
  crm: string;
  acronym: string;
  status: string;
  photo?: string;
  pagamentos: SelectOption[];
  convenios: SelectOption[];
  unidades: { value: string; label: string; room?: string; open?: string }[];
  servicos: { id: string; label: string; price: string }[];
}