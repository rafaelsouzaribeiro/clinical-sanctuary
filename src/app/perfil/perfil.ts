import { Component, inject, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AlertModal } from '../alert-modal/alert-modal';
import {
  DoctorProfile,
  DoctorComment,
  DoctorService,
  HealthInsurance,
  ClinicUnit,
} from '../services/iservice/perfil.interface';
import { PerfilService } from '../services/impl/perfil.service';
import { ScheduleService } from '../services/impl/schedule.service';

@Component({
  selector: 'app-perfil',
  imports: [AlertModal],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil {
  private route = inject(ActivatedRoute);

  public doctor = signal<DoctorProfile>({
    id: '',
    slug: '',
    name: '',
    specialties: [],
    phone: '',
    crm: '',
    photo: '',
    stat_number: 0,
    rating: 0,
    patient_number: 0,
    experience: 0,
    email: '',
    password: '',
    description: '',
    payments: [],
    health: [],
    units: [],
  });

  public comments = signal<DoctorComment[]>([]);
  public services = signal<DoctorService[]>([]);

  public servicoSelecionado: DoctorService | null = null;
  public convenioSelecionado: HealthInsurance | null = null;
  public unidadeSelecionada: ClinicUnit | null = null;
  public showModal: boolean = false;
  public nextSlotMessage = signal<string>('Carregando horário...');

  constructor(
    private titleService: Title,
    private router: Router,
    private perfilService: PerfilService,
    private scheduleService: ScheduleService
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';

    this.perfilService.getDoctor(slug).subscribe((doctor) => {
      this.doctor.set(doctor);

      const specialtiesLabel = doctor.specialties
        .map((s) => s.speciality_name)
        .join(', ');

      this.titleService.setTitle(`Perfil - ${specialtiesLabel} - ${doctor.name}`);

      this.scheduleService.getNextAvailableMessage(doctor.id).subscribe((msg) => {
        this.nextSlotMessage.set(msg);
      });

      this.perfilService.getComments(doctor.id).subscribe((comments) => {
        this.comments.set(comments);
      });

      this.perfilService.getServices(doctor.id).subscribe((services) => {
        this.services.set(services);
      });
    });
  }

  get consultaLink(): string[] {
    return ['/consultas', this.doctor().slug, this.doctor().id];
  }

  public goConsultation(): void {
    if (!this.servicoSelecionado || !this.convenioSelecionado || !this.unidadeSelecionada) {
      this.showModal = true;
      return;
    }

    const servico = {
      id: this.servicoSelecionado.exam_id,
      label: 'Consulta',
      price: this.servicoSelecionado.price,
    };

    const doctorFiltrado = {
      ...this.doctor(),
      services: [this.servicoSelecionado],
      health: [this.convenioSelecionado],
      units: [this.unidadeSelecionada],
    };

    this.router.navigate(this.consultaLink, {
      state: { doctors: doctorFiltrado },
    });
  }

  public setService(servico: DoctorService): void {
    this.servicoSelecionado = servico;

    const convenioCorrespondente = this.doctor().health?.find(
      (c) => c.id === servico.health_insurance_id
    );

    if (convenioCorrespondente) {
      this.convenioSelecionado = convenioCorrespondente;
    }
  }

  public setConvenio(convenio: HealthInsurance): void {
    this.convenioSelecionado = convenio;

    const servicoCorrespondente = this.services().find(
      (s) => s.health_insurance_id === convenio.id
    );

    if (servicoCorrespondente) {
      this.servicoSelecionado = servicoCorrespondente;
    }
  }

  public setUnidade(unidade: ClinicUnit): void {
    this.unidadeSelecionada = unidade;
  }
}