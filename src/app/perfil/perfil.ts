import { Component, inject, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AlertModal } from '../alert-modal/alert-modal';
import { PerfilService } from '../services/impl/perfil.service';
import { ScheduleService } from '../services/impl/schedule.service';
import { 
  Doctor,DoctorComment,
  DoctorServiceByHealthAndSpeciality,
  HealthInsurance,
  DoctorUnit
 } from '../services/iservice/consultas.interface';

@Component({
  selector: 'app-perfil',
  imports: [AlertModal],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil {
  private route = inject(ActivatedRoute);

  public doctor = signal<Doctor>({
    id: '',
    slug: '',
    email: '',
    name: '',
    phone: '',
    crm: '',
    photo: '',
    acronym: '',
    stat_number: 0,
    experience: 0,
    description: '',
    status: 'Ativo',
    rating: 0,
    patient_number: 0,
    specialties: [],
    payments: [],
    units: [],
    health: [],
    services: [],
  });

  public comments = signal<DoctorComment[]>([]);
  public services = signal<DoctorServiceByHealthAndSpeciality[]>([]);

  public servicoSelecionado: DoctorServiceByHealthAndSpeciality | null = null;
  public convenioSelecionado: HealthInsurance | null = null;
  public unidadeSelecionada: DoctorUnit | null = null;
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

    const doctor = this.doctor();

    const doctorFiltrado = {
      ...doctor,
      services: [
        this.servicoSelecionado,
        ...this.services().filter(
          s => !(
            s.health_insurance_id === this.servicoSelecionado!.health_insurance_id &&
            s.speciality_id === this.servicoSelecionado!.speciality_id
          )
        )
      ],
      health: [
        this.convenioSelecionado,
        ...doctor.health.filter(h => h.id !== this.convenioSelecionado!.id)
      ],
      units: [
        this.unidadeSelecionada,
        ...doctor.units.filter(u => u.id !== this.unidadeSelecionada!.id)
      ],
    };

    this.router.navigate(this.consultaLink, {
      state: { doctors: doctorFiltrado },
    });
  }

  public setService(servico: DoctorServiceByHealthAndSpeciality): void {
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

  public setUnidade(unidade: DoctorUnit): void {
    this.unidadeSelecionada = unidade;
  }
}