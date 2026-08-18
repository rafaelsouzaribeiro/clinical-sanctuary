import { DateCalendar } from './interface.dia.calendario';

export class Calendar{
    public data: Date = new Date();
    public weekdays: string[] = [];
    public calendarDays: DateCalendar[] = [];
    public mesTitulo: string = '';
    public datesBooked: Date[] = [];

    public selecionarData(dia: number, isMuted: boolean, isBooked: boolean): void {
        const mesAtual = this.data.getMonth();
        const anoAtual = this.data.getFullYear();

        if (!isMuted && !isBooked) {
            this.data = new Date(anoAtual, mesAtual, dia);
        }
    }

    private isDateBooked(ano: number, mes: number, dia: number): boolean {
        return this.datesBooked.some(
            (d) =>
                d.getFullYear() === ano &&
                d.getMonth() === mes &&
                d.getDate() === dia
        );
    }
    
    public mesAnterior(): void {
        this.data.setMonth(this.data.getMonth() - 1);
        this.atualizarTituloMes();
        this.atualizarDiasDaSemana();
        this.atualizarCalendario();
    }
    
    public proximoMes(): void {
        this.data.setMonth(this.data.getMonth() + 1);
        this.atualizarTituloMes();
        this.atualizarDiasDaSemana();
        this.atualizarCalendario();
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
    
      public atualizarCalendario(): void {
        const ano = this.data.getFullYear();
        const mes = this.data.getMonth();
        const primeiroDiaDoMes = new Date(ano, mes, 1);
        const ultimoDiaDoMes = new Date(ano, mes + 1, 0);
        const totalDiasMesAtual = ultimoDiaDoMes.getDate();
        const diaSemanaPrimeiroDia = primeiroDiaDoMes.getDay();
        const ultimoDiaMesAnterior = new Date(ano, mes, 0).getDate();
    
        const dias: DateCalendar[] = [];
        const hoje = new Date();
    
        for (let i = diaSemanaPrimeiroDia; i > 0; i--) {
          dias.push({ numero: ultimoDiaMesAnterior - i + 1, isMuted: true, isActive: false, isBooked: false });
        }
    
        for (let dia = 1; dia <= totalDiasMesAtual; dia++) {
          const isHoje =
            dia === hoje.getDate() &&
            mes === hoje.getMonth() &&
            ano === hoje.getFullYear();
          const isBooked = this.isDateBooked(ano, mes, dia);
          dias.push({ numero: dia, isMuted: false, isActive: isHoje, isBooked });
        }
    
        const totalEspacosGrid = 42;
        const espacosPreenchidos = diaSemanaPrimeiroDia + totalDiasMesAtual;
        const diasRestantes = totalEspacosGrid - espacosPreenchidos;
    
        for (let dia = 1; dia <= diasRestantes; dia++) {
          dias.push({ numero: dia, isMuted: true, isActive: false, isBooked: false });
        }
    
        this.calendarDays = dias;
      }
}