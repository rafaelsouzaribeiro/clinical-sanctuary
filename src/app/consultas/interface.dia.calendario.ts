interface DateCalendar {
  numero: number;
  isMuted: boolean;
  isActive: boolean;
  isBooked?: boolean; 
}

interface DateConsultation{
  date: string;
  availableTimes: string[];
}

export type { DateCalendar, DateConsultation };