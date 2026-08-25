import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectOption } from '../location-select/interface.sellect-option';
import { SelectEventLocation } from '../select-event-location/select-event-location';
import { Calendar } from './calendar';
import { DateCalendar } from './interface.dia.calendario';
import { Title } from '@angular/platform-browser';
import { AlertModal } from '../alert-modal/alert-modal';
import { ConsultasService } from '../services/impl/consultas.service';
import { AvailableTime } from '../services/iservice/consultas.interface';

interface MedicoConsulta {
  id: string;
  slug: string;
  acronym?: string;
  name: string;
  status?: string;
  specialty: string;
  phone: string;
  crm: string;
  pagamentos: SelectOption[];
  convenios: SelectOption[];
  unidades: { value: string; label: string; room?: string; open?: string }[];
  servicos: SelectOption[];
}

@Component({
  viewProviders: [Title],
  selector: 'app-consultas',
  standalone: true,
  imports: [CommonModule, SelectEventLocation, AlertModal],
  templateUrl: './consultas.html',
  styleUrl: './consultas.css',
})
export class Consultas implements OnInit {
  public medicoId: string | null = null;

  public unidade: string = '';
  public city: string = '';
  public servico: string = '';
  public pagamento: string = '';
  public convenio: string = '';
  public observacoes: string = '';
  public unidadeValue: string = '';
  public showModal: boolean = false;

  public availableTimes = signal<AvailableTime[]>([]);
  public medico = signal<MedicoConsulta | null>(null);

  public calendar: Calendar = new Calendar();

  horarios: string[] = [];
  horarioSelecionado: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private consultaService: ConsultasService
  ) {}

  ngOnInit(): void {
    this.medicoId = this.route.snapshot.paramMap.get('id');

    const navigation = this.router.currentNavigation();
    const stateFromNavigation = navigation?.extras?.state?.['doctors'];
    const stateFromHistory =
      typeof history !== 'undefined' ? history.state?.['doctors'] : undefined;
    const doctorFromState = stateFromNavigation ?? stateFromHistory;

    if (doctorFromState) {
      this.medico.set(doctorFromState);
      this.inicializarDadosFormulario();
    }
    
    if (!this.medico()) {
      this.consultaService.getDoctorProfile(this.medicoId).subscribe((doctor) => {
        this.medico.set({
          id: doctor.id,
          slug: doctor.slug,
          acronym: doctor.acronym ?? '',
          name: doctor.name,
          status: doctor.status ?? 'Ativo',
          specialty: doctor.specialty,
          phone: doctor.phone,
          crm: doctor.crm,
          pagamentos: doctor.pagamentos,
          convenios: doctor.convenios,
          unidades: doctor.unidades,
          servicos: doctor.servicos.map((s: any) => ({
            value: s.id,
            label: `${s.label} - ${s.price}`,
          })),
        });

      });
    }

      this.consultaService.getAvailableTimes(this.medicoId).subscribe((availableTimes) => {
        this.availableTimes.set(availableTimes);
        this.calendar.availableDates.set(availableTimes);
        this.addHoursToDate(availableTimes);
      });

      this.inicializarDadosFormulario();
  }

  private inicializarDadosFormulario(): void {
    const medicoAtual = this.medico();
    if (!medicoAtual || !medicoAtual.unidades?.length) return;

    const primeiraUnidade = medicoAtual.unidades[0];
    const partesLabel = primeiraUnidade.label.split(' - ');

    this.servico = medicoAtual.servicos[0]?.value ?? '';
    this.pagamento = medicoAtual.pagamentos[0]?.value ?? '';
    this.convenio = medicoAtual.convenios[0]?.value ?? '';
    this.unidadeValue = primeiraUnidade.value;
    
    this.unidade = partesLabel[0] ?? '';
    this.city = partesLabel[1] ?? '';

    this.title.setTitle(`Nova Consulta - Clinical Sanctuary - ${medicoAtual.name}`);
  }

  public addHoursToDate(items: AvailableTime[]): void {
    this.horarios = [];
    this.horarioSelecionado = '';

    const dataSelecionada = this.calendar.data;

    items.forEach((item) => {
      const [year, month, day] = item.date.split('-').map(Number);
      const dateItem = new Date(year, month - 1, day);

      const calendarDateSemHorario = new Date(
        dataSelecionada.getFullYear(),
        dataSelecionada.getMonth(),
        dataSelecionada.getDate()
      );

      if (dateItem.getTime() === calendarDateSemHorario.getTime()) {
        this.horarios = item.availableTimes;
      }
    });

    if (this.horarios.length > 0) {
      this.horarioSelecionado = this.horarios[0];
    }
  }

  public selecionarDia(diaClicado: DateCalendar): void {
    this.calendar.selecionarData(
      diaClicado.numero,
      diaClicado.isMuted,
      diaClicado.isBooked ?? false
    );

    this.addHoursToDate(this.availableTimes());
  }

  public selecionarHorario(horario: string): void {
    this.horarioSelecionado = horario;
  }

  public onUnidadeChange(opcaoSelecionada: SelectOption): void {
    const partesLabel = opcaoSelecionada.label.split(' - ');
    this.unidade = partesLabel[0] ?? '';
    this.city = partesLabel[1] ?? '';
    this.unidadeValue = opcaoSelecionada.value;
  }

  public onDescartar(): void {
    this.router.navigate(['/']);
  }

  public onConfirmarAgendamento(): void {
    const agendamento = {
      medicoId: this.medico()?.id,
      medicoNome: this.medico()?.name,
      especialidade: this.medico()?.specialty,
      unidade: this.unidadeValue,
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