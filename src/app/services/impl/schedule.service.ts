import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import BASEURL from '../../../app.api';
import { AvailableTime } from '../iservice/schedule.service'; 

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor(private http: HttpClient) {}

  getAvailableTimes(): Observable<AvailableTime[]> {
    return this.http.get<AvailableTime[]>(`${BASEURL}/availableTimes`);
  }

  getNextAvailableMessage(): Observable<string> {
    return this.getAvailableTimes().pipe(
      map((list) => this.buildMessage(list))
    );
  }

  private buildMessage(list: AvailableTime[]): string {
    const now = new Date();
    const next = this.findNextSlot(list, now);

    if (!next) {
      return 'Nenhum horário disponível no momento';
    }

    const label = this.formatDayLabel(next.date, now);
    return `Próximo horário disponível: ${label}, às ${next.time}`;
  }

  private findNextSlot(
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

  private formatDayLabel(dateStr: string, now: Date): string {
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

  private parseDate(dateStr: string): Date | null {
    const [y, m, d] = dateStr.split('-').map(Number);
    if (!y || !m || !d) return null;
    return new Date(y, m - 1, d);
  }

  private combineDateAndTime(dateStr: string, time: string): Date | null {
    const [y, m, d] = dateStr.split('-').map(Number);
    const [hh, mm] = time.split(':').map(Number);
    if ([y, m, d, hh, mm].some((n) => Number.isNaN(n))) return null;
    return new Date(y, m - 1, d, hh, mm, 0, 0);
  }

  private startOfDay(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
}