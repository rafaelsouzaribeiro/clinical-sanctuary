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
    const diaSelecionado = dataAtual.getDate(); // <--- Pega o dia selecionado atualmente

    const primeiroDiaDoMes = new Date(ano, mes, 1);
    const ultimoDiaDoMes = new Date(ano, mes + 1, 0);
    const totalDiasMesAtual = ultimoDiaDoMes.getDate();
    const diaSemanaPrimeiroDia = primeiroDiaDoMes.getDay();
    const ultimoDiaMesAnterior = new Date(ano, mes, 0).getDate();

    const dias: DateCalendar[] = [];

    for (let i = diaSemanaPrimeiroDia; i > 0; i--) {
      dias.push({
        numero: ultimoDiaMesAnterior - i + 1,
        isMuted: true,
        isActive: false,
        isBooked: true,
      });
    }

    for (let dia = 1; dia <= totalDiasMesAtual; dia++) {
      const isActive = dia === diaSelecionado;
      const isBooked = this.isDateBooked(ano, mes, dia);

      dias.push({
        numero: dia,
        isMuted: false,
        isActive: isActive && !isBooked,
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
  public dayActive: number = this.data.getDate();

  constructor() {
    this.atualizarTituloMes();
    this.atualizarDiasDaSemana();
  }

  public selecionarData(dia: number, isMuted: boolean, isBooked: boolean): void {
    if (!isMuted && !isBooked) {
      const dataAtual = this.dataSignal();
      const novaData = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), dia);
      
      this.dataSignal.set(novaData);
      this.dayActive = dia;
    }
  }

  private isDateBooked(ano: number, mes: number, dia: number): boolean {
    const disponiveis = this.availableDates();
    
    if (!disponiveis || disponiveis.length === 0) {
      return false;
    }

    const disponivel = disponiveis.some((item) => {
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
    const novaData = new Date(this.dataSignal());
    novaData.setMonth(novaData.getMonth() - 1);

    this.monthActive = novaData.getMonth();
    this.dataSignal.set(novaData);

    this.atualizarTituloMes();
    this.atualizarDiasDaSemana();
  }

  public proximoMes(): void {
    const novaData = new Date(this.dataSignal());
    novaData.setMonth(novaData.getMonth() + 1);

    this.monthActive = novaData.getMonth();
    this.dataSignal.set(novaData);

    this.atualizarTituloMes();
    this.atualizarDiasDaSemana();
  }

  public atualizarTituloMes(): void {
    const data = this.dataSignal();
    const nomeDoMes = data.toLocaleString('pt-BR', { month: 'long' });
    const ano = data.getFullYear();
    this.mesTitulo = `${nomeDoMes.charAt(0).toUpperCase() + nomeDoMes.slice(1)} - ${ano}`;
  }

  public atualizarDiasDaSemana(): void {
    const data = this.dataSignal();
    const dias: string[] = [];
    let dataReferencia = new Date(data.getFullYear(), data.getMonth(), 1);
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