import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Calendar } from './calendar';
import { DateCalendar } from './interface.dia.calendario';
import { Title } from '@angular/platform-browser';
import { AlertModal } from '../alert-modal/alert-modal';
import { ConsultasService } from '../services/impl/consultas.service';
import { Doctor,AvailableTimeSlot } from '../services/iservice/consultas.interface';


@Component({
  viewProviders: [Title],
  selector: 'app-consultas',
  standalone: true,
  imports: [CommonModule, AlertModal],
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

  public availableTimes = signal<AvailableTimeSlot[]>([]);
  public medico = signal<Doctor | null>(null);

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
      this.medicoId = doctorFromState.id;
    }


    this.consultaService.getDoctorByID(this.medicoId ?? "").subscribe((doctor) => {
        this.medico.set({
          id: doctor.id,
          slug: doctor.slug,
          acronym: doctor.acronym ?? '',
          name: doctor.name,
          status: doctor.status ?? 'Ativo',
          specialties: doctor.specialties,
          phone: doctor.phone,
          crm: doctor.crm,
          payments: doctor.payments,
          health: doctor.health,
          units: doctor.units,
          photo: doctor.photo,
          stat_number: doctor.stat_number,
          experience: doctor.experience,
          description: doctor.description,
          rating: doctor.rating,
          patient_number: doctor.patient_number,
          email: doctor.email,
        });
        this.inicializarDadosFormulario(doctorFromState);
      });


    if (this.medicoId) {
      this.consultaService.getAvailableTimes(this.medicoId).subscribe((availableTimes) => {
        this.availableTimes.set(availableTimes);
        this.calendar.availableDates.set(availableTimes);
        this.addHoursToDate(availableTimes);
      });
    }

  }

private inicializarDadosFormulario(doctorFromState: Doctor): void {
  let medicoAtual = this.medico();
  if (doctorFromState) medicoAtual = doctorFromState;

  if (!medicoAtual) return;

  const primeiraUnidade = medicoAtual.units?.[0];
  if (primeiraUnidade) {
    this.unidade = primeiraUnidade.name ?? '';
    this.city = primeiraUnidade.city ?? '';
    this.unidadeValue = primeiraUnidade.id ?? primeiraUnidade.name ?? '';
  }

  this.pagamento =
    medicoAtual.payments?.[0]?.id ?? medicoAtual.payments?.[0]?.name ?? '';

  this.convenio = medicoAtual.health?.[0]?.id ?? medicoAtual.health?.[0]?.name ?? '';

  this.servico =
    medicoAtual.specialties?.[0]?.speciality_id ??
    medicoAtual.specialties?.[0]?.id ??
    medicoAtual.health?.[0]?.id ??
    '';

  this.title.setTitle(`Nova Consulta - Clinical Sanctuary - ${medicoAtual.name}`);
}

  public addHoursToDate(items: AvailableTimeSlot[]): void {
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

  public onUnidadeChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedId = selectElement.value;

    const opcaoSelecionada = this.medico()?.units?.find(unit => unit.id === selectedId);

    if (opcaoSelecionada) {
      this.unidade = opcaoSelecionada.name ?? '';
      this.city = opcaoSelecionada.city ?? '';
      this.unidadeValue = opcaoSelecionada.id ?? opcaoSelecionada.name ?? '';
    }
  }

  public onDescartar(): void {
    this.router.navigate(['/']);
  }

  public onConfirmarAgendamento(): void {
    const agendamento = {
      medicoId: this.medico()?.id,
      medicoNome: this.medico()?.name,
      especialidade: this.medico()?.specialties[0]?.speciality_name,
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
  public onServicoChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.servico = selectElement.value;
  }

  public onPagamentoChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.pagamento = selectElement.value;
  }

  public onConvenioChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.convenio = selectElement.value;
  }

  public onObservacoesChange(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    this.observacoes = textarea.value;
  }
}