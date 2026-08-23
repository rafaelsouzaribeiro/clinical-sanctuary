import { Component,inject,signal } from '@angular/core';
import {Router} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AlertModal } from '../alert-modal/alert-modal';
import { Servico, Convenio, Unidade } from './../services/iservice/perfil.interface';
import { PerfilService } from '../services/impl/perfil.service';
import { ActivatedRoute } from '@angular/router';
import { DoctorProfile } from '../services/iservice/perfil.interface';
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
    specialty: '',
    phone: '',
    crm: '',
    photo: '',
    statNumber: 0,
    rating: 0,
    patientNumber: 0,
    experience: 0,
    description: '',
    pagamentos: [],
    convenios: [],
    unidades: [],
    servicos: [],
    comments: []
  });
  public servicoSelecionado: Servico | null = null;
  public convenioSelecionado: Convenio | null = null;
  public unidadeSelecionada: Unidade | null = null;
  public showModal: boolean = false;
  public nextSlotMessage = signal<string>('Carregando horário...');
  
  constructor(
      private titleService: Title, 
      private router: Router,
      private perfilService: PerfilService,
      private scheduleService: ScheduleService  
    ) {
  }


  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';

    this.perfilService.getDoctor(slug).subscribe((doctor)=>{
          this.doctor.set(doctor);
          this.titleService.setTitle(`Perfil - ${doctor.specialty} - ${doctor.name}`);

          this.scheduleService.getNextAvailableMessage(doctor.id).subscribe((msg) => {
            this.nextSlotMessage.set(msg);
          });
    });

    
  }

  get consultaLink():string[]{
    return ['/consultas', this.doctor().slug, this.doctor().id];
  }

  
  public goConsultation(): void {

    if (!this.servicoSelecionado || !this.convenioSelecionado || !this.unidadeSelecionada) {
      this.showModal = true;
      return;
    }

    const doctorFiltrado = {
      ...this.doctor(),
      servicos: this.servicoSelecionado ? [this.servicoSelecionado] : this.doctor().servicos,
      convenios: this.convenioSelecionado ? [this.convenioSelecionado] : this.doctor().convenios,
      unidades: this.unidadeSelecionada ? [this.unidadeSelecionada] : this.doctor().unidades,
    };

    this.router.navigate(this.consultaLink, {
      state: { doctors: doctorFiltrado },
    });
  }

  public setService(servico: Servico): void {
    this.servicoSelecionado = servico;
  }

  public setConvenio(convenio: Convenio):void{
    this.convenioSelecionado = convenio;
  }

  public setUnidade(unidade: Unidade):void{
    this.unidadeSelecionada = unidade;
  }


}