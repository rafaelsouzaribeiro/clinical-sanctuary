import { signal, computed, Signal } from '@angular/core';
import { DateCalendar } from './interface.dia.calendario';
import { AvailableTime } from '../services/iservice/consultas.interface';

export class Calendar {
  public dataSignal = signal<Date>(new Date());
  public availableDates = signal<AvailableTime[]>([]);

  public calendarDays: Signal<DateCalendar[]> = computed(() => {
    const dataAtual = this.dataSignal();
    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth();
    const primeiroDiaDoMes = new Date(ano, mes, 1);
    const ultimoDiaDoMes = new Date(ano, mes + 1, 0);
    const totalDiasMesAtual = ultimoDiaDoMes.getDate();
    const diaSemanaPrimeiroDia = primeiroDiaDoMes.getDay();
    const ultimoDiaMesAnterior = new Date(ano, mes, 0).getDate();

    const dias: DateCalendar[] = [];
    const hoje = new Date();

    for (let i = diaSemanaPrimeiroDia; i > 0; i--) {
      dias.push({
        numero: ultimoDiaMesAnterior - i + 1,
        isMuted: true,
        isActive: false,
        isBooked: true,
      });
    }

    // Dias do mês atual
    for (let dia = 1; dia <= totalDiasMesAtual; dia++) {
      const isHoje =
        dia === hoje.getDate() &&
        mes === hoje.getMonth() &&
        ano === hoje.getFullYear();

      const isBooked = this.isDateBooked(ano, mes, dia);
      dias.push({
        numero: dia,
        isMuted: false,
        isActive: isHoje && !isBooked,
        isBooked,
      });
    }

    const totalEspacosGrid = 42;
    const espacosPreenchidos = diaSemanaPrimeiroDia + totalDiasMesAtual;
    const diasRestantes = totalEspacosGrid - espacosPreenchidos;

    for (let dia = 1; dia <= diasRestantes; dia++) {
      dias.push({
        numero: dia,
        isMuted: true,
        isActive: false,
        isBooked: true,
      });
    }

    return dias;
  });

  public get data(): Date {
    return this.dataSignal();
  }

  public weekdays: string[] = [];
  public mesTitulo: string = '';

  public monthActive: number = this.data.getMonth();
  public yearActive: number = this.data.getFullYear();
  public dayActive: number = this.data.getDay();

  constructor() {
    this.atualizarTituloMes();
    this.atualizarDiasDaSemana();
  }

  public selecionarData(dia: number, isMuted: boolean, isBooked: boolean): void {
    const mesAtual = this.data.getMonth();
    const anoAtual = this.data.getFullYear();
    this.dayActive = dia;

    if (!isMuted && !isBooked) {
      const novaData = new Date(anoAtual, mesAtual, dia);
      this.dataSignal.set(novaData);
    }
  }

  private isDateBooked(ano: number, mes: number, dia: number): boolean {
    const disponivel = this.availableDates().some((item) => {
      const [y, m, d] = item.date.split('-').map(Number);
      return (
        y === ano &&
        m - 1 === mes &&
        d === dia &&
        item.availableTimes &&
        item.availableTimes.length > 0
      );
    });

    return !disponivel;
  }

  public mesAnterior(): void {
    const novaData = new Date(this.data);
    novaData.setMonth(novaData.getMonth() - 1);

    this.monthActive = novaData.getMonth();
    this.dataSignal.set(novaData);

    this.atualizarTituloMes();
    this.atualizarDiasDaSemana();
  }

  public proximoMes(): void {
    const novaData = new Date(this.data);
    novaData.setMonth(novaData.getMonth() + 1);

    this.monthActive = novaData.getMonth();
    this.dataSignal.set(novaData);

    this.atualizarTituloMes();
    this.atualizarDiasDaSemana();
  }

  public atualizarTituloMes(): void {
    const nomeDoMes = this.data.toLocaleString('pt-BR', { month: 'long' });
    const ano = this.data.getFullYear();
    this.mesTitulo = `${nomeDoMes.charAt(0).toUpperCase() + nomeDoMes.slice(1)} - ${ano}`;
  }

  public atualizarDiasDaSemana(): void {
    const dias: string[] = [];
    let dataReferencia = new Date(this.data.getFullYear(), this.data.getMonth(), 1);
    dataReferencia.setDate(dataReferencia.getDate() - dataReferencia.getDay());

    for (let i = 0; i < 7; i++) {
      const nomeDia = dataReferencia
        .toLocaleString('pt-BR', { weekday: 'short' })
        .replace('.', '')
        .toUpperCase();
      dias.push(nomeDia);
      dataReferencia.setDate(dataReferencia.getDate() + 1);
    }
    this.weekdays = dias;
  }
}