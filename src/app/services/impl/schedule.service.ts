import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import BASEURL from '../../../app.api';
import { AvailableTime, IScheduleService } from '../iservice/schedule.service'; 

@Injectable({
  providedIn: 'root',
})
export class ScheduleService implements IScheduleService {
  constructor(private http: HttpClient) {}

  public getAvailableTimes(idDoctor: string): Observable<AvailableTime[]> {
    console.log(`${BASEURL}/availableTimes?idDoctor=${idDoctor}`)
    return this.http.get<AvailableTime[]>(`${BASEURL}/availableTimes?idDoctor=${idDoctor}`);
  }

  public getNextAvailableMessage(idDoctor: string): Observable<string> {
    return this.getAvailableTimes(idDoctor).pipe(
      map((list) => this.buildMessage(list))
    );
  }

  public buildMessage(list: AvailableTime[]): string {
    const now = new Date();
    const next = this.findNextSlot(list, now);

    if (!next) {
      return 'Nenhum horário encontrado no momento. Clique em agendar para mais informações.';
    }

    const label = this.formatDayLabel(next.date, now);
    return `Próximo horário disponível: ${label}, às ${next.time}`;
  }

  public findNextSlot(
    list: AvailableTime[],
    now: Date
  ): { date: string; time: string } | null {
    const sorted = [...list].sort((a, b) => a.date.localeCompare(b.date));

    for (const item of sorted) {
      const day = this.parseDate(item.date);
      if (!day) continue;

      const times = [...item.availableTimes].sort();

      for (const time of times) {
        const slot = this.combineDateAndTime(item.date, time);
        if (slot && slot > now) {
          return { date: item.date, time };
        }
      }
    }

    return null;
  }

  public formatDayLabel(dateStr: string, now: Date): string {
    const target = this.parseDate(dateStr);
    if (!target) return dateStr;

    const today = this.startOfDay(now);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const targetDay = this.startOfDay(target);

    if (targetDay.getTime() === today.getTime()) {
      return 'Hoje';
    }

    if (targetDay.getTime() === tomorrow.getTime()) {
      return 'Amanhã';
    }

    return target.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  public parseDate(dateStr: string): Date | null {
    const [y, m, d] = dateStr.split('-').map(Number);
    if (!y || !m || !d) return null;
    return new Date(y, m - 1, d);
  }

  public combineDateAndTime(dateStr: string, time: string): Date | null {
    const [y, m, d] = dateStr.split('-').map(Number);
    const [hh, mm] = time.split(':').map(Number);
    if ([y, m, d, hh, mm].some((n) => Number.isNaN(n))) return null;
    return new Date(y, m - 1, d, hh, mm, 0, 0);
  }

   public startOfDay(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
}