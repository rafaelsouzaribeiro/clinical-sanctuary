import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute,Router } from '@angular/router';
import { SelectOption } from '../location-select/interface.sellect-option';
import { SelectEventLocation } from '../select-event-location/select-event-location';
import { Calendar } from './calendar';
import { DateCalendar,DateConsultation } from './interface.dia.calendario';
import{Title} from '@angular/platform-browser';
import doctors from './doctors.json';
import datesBooked from './datesBooked.json';
import availableTimes from './availableTimes.json';
import { AlertModal } from '../alert-modal/alert-modal';
 
@Component({
  viewProviders:[Title],
  selector: 'app-consultas',
  standalone: true,
  imports: [CommonModule, SelectEventLocation,AlertModal],
  templateUrl: './consultas.html',
  styleUrl: './consultas.css',
})
export class Consultas implements OnInit {
  public medicoId:string | null = null;
  public medico: {
    id: string;
    slug: string;
    acronym: string;
    name: string;
    status: string;
    specialty: string;
    phone: string;
    crm: string;
    pagamentos: SelectOption[];
    convenios: SelectOption[];
    unidades: SelectOption[];
    servicos: SelectOption[];
  } | undefined;

    public unidade: string = '';
    public city: string = '';
    public servico: string = '';
    public pagamento: string = '';
    public convenio: string = '';
    public observacoes: string = '';
    public unidadeValue: string = '';
    public showModal: boolean = false;
    
    public doctors:Array<{
      id:string;
      slug:string;
      acronym: string;
      name: string;
      status: string;
      specialty: string;
      phone: string;
      crm: string;
      pagamentos: SelectOption[];
      convenios: SelectOption[];
      unidades: SelectOption[];
      servicos: SelectOption[];
    }>=doctors;
    
  public calendar:Calendar = new Calendar();

  weekdays: string[] = [];
  mesTitulo : string = '';

  calendarDays: DateCalendar[] = [];
  horarios: string[] = [];
  horarioSelecionado: string = '';
  consultaFocoSelecionado: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
  ) {
   
  }
  ngOnInit(): void {
    this.medicoId = this.route.snapshot.paramMap.get('id');
    const navigation = this.router.currentNavigation();
    const stateFromNavigation = navigation?.extras?.state?.['doctors'];
    const stateFromHistory = typeof history !== 'undefined' ? history.state?.['doctors'] : undefined;

    const doctorFromState = stateFromNavigation ?? stateFromHistory;
    this.medico = doctorFromState ?? this.doctors.find((d) => d.id === this.medicoId);

     if (!this.medico) {
      this.router.navigate(['/not-found']);
      return;
    }

    this.unidade = this.medico?.unidades[0]?.label.split(' - ')[0] ?? '';
    this.city = this.medico?.unidades[0]?.label.split(' - ')[1] ?? '';
    this.unidadeValue = this.medico?.unidades[0]?.value ?? '';
    this.servico = this.medico?.servicos[0]?.value ?? '';
    this.pagamento = this.medico?.pagamentos[0]?.value ?? '';
    this.convenio = this.medico?.convenios[0]?.value ?? '';
    this.horarioSelecionado = this.horarioSelecionado ?? this.horarios[0];

    this.calendar.datesBooked = datesBooked.map((data: string) => {
      const [ano, mes, dia] = data.split('-').map(Number);
      return new Date(ano, mes - 1, dia);
    });

    this.title.setTitle(`Nova Consulta - Clinical Sanctuary - ${this.medico?.name}`);
    this.calendar.atualizarTituloMes();
    this.calendar.atualizarDiasDaSemana();
    this.calendar.atualizarCalendario();
    this.addHoursToDate(availableTimes);
  }

public addHoursToDate(items: DateConsultation[]): void {
    this.horarios = [];
    this.horarioSelecionado='';

    items.forEach((item) => {
      const [year, month, day] = item.date.split('-').map(Number);
      const dateItem = new Date(year, month - 1, day);

      const calendarDateSemHorario = new Date(
        this.calendar.data.getFullYear(),
        this.calendar.data.getMonth(),
        this.calendar.data.getDate()
      );

      if (dateItem.getTime() === calendarDateSemHorario.getTime()) {
        this.horarios = item.availableTimes;
      }
    });
  } 

  public selecionarDia(diaClicado: DateCalendar): void {
    this.calendar.calendarDays.forEach((d) => (d.isActive = false));
    diaClicado.isActive = true;
    this.calendar.selecionarData(diaClicado.numero, diaClicado.isMuted,diaClicado.isBooked ?? false);
    this.addHoursToDate(availableTimes);
  }

  public selecionarHorario(horario: string): void {
    this.horarioSelecionado = horario;
  }

  public onUnidadeChange(opcaoSelecionada: SelectOption): void {
    this.unidade = opcaoSelecionada.label.split(' - ')[0];
    this.city = opcaoSelecionada.label.split(' - ')[1];
    this.unidadeValue = opcaoSelecionada.value;
  }

    public onDescartar(): void {
    this.router.navigate(['/']);
  }

  public onConfirmarAgendamento(): void {
    const agendamento = {
      medicoId: this.medico?.id,
      medicoNome: this.medico?.name,
      especialidade: this.medico?.specialty,
      unidade:  this.unidadeValue,
      cidade: this.city,
      data: this.calendar.data,
      horario: this.horarioSelecionado,
      servico: this.servico,
      pagamento: this.pagamento,
      convenio: this.convenio,
      observacoes: this.observacoes,
    };

    if (!this.horarioSelecionado) {
      this.showModal = true;
      return;
    }

    console.log('Agendamento confirmado:', agendamento);
  }

  public onServicoChange(opcaoSelecionada: SelectOption): void {
    this.servico = opcaoSelecionada.value;
  }

  public onPagamentoChange(opcaoSelecionada: SelectOption): void {
    this.pagamento = opcaoSelecionada.value;
  }

  public onConvenioChange(opcaoSelecionada: SelectOption): void {
    this.convenio = opcaoSelecionada.value;
  }

  public onObservacoesChange(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    this.observacoes = textarea.value;
  }
}