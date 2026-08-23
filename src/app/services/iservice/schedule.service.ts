import { Observable } from 'rxjs';

export interface AvailableTime {
  date: string; 
  availableTimes: string[]; 
}

export interface IScheduleService {
  getAvailableTimes(idDoctor: string): Observable<AvailableTime[]>;
  getNextAvailableMessage(idDoctor: string): Observable<string>;
  buildMessage(list: AvailableTime[]): string
  findNextSlot(
    list: AvailableTime[],
    now: Date
  ): { date: string; time: string } | null 
  formatDayLabel(dateStr: string, now: Date): string 
  parseDate(dateStr: string): Date | null 
  combineDateAndTime(dateStr: string, time: string): Date | null 
  startOfDay(date: Date): Date 
}

