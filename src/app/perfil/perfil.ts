import { Component } from '@angular/core';
import doctorsData from './doctors.json';
import commentsData from './comments.json';
import {Router} from '@angular/router';
import { Title } from '@angular/platform-browser';

interface Servico {
  id: string;
  label: string;
  price: string;
}

interface Convenio {
  value: string;
  label: string;
}

interface Unidade {
  value: string;
  label: string;
  room: string;
  open: string;
}

@Component({
  selector: 'app-perfil',
  imports: [],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil {
  public doctors = doctorsData;
  public comments = commentsData;
  public servicoSelecionado: Servico | null = null;
  public convenioSelecionado: Convenio | null = null;
  public unidadeSelecionada: Unidade | null = null;
  public showModal: boolean = false;

  constructor(private titleService: Title, private router: Router) {
    this.titleService.setTitle(`Perfil - ${this.doctors.specialty} - ${this.doctors.name}`);
  }

  get consultaLink():string[]{
    return ['/consultas', this.doctors.slug, this.doctors.id];
  }

  public goConsultation(): void {

    if (!this.servicoSelecionado || !this.convenioSelecionado || !this.unidadeSelecionada) {
      this.showModal = true;
      return;
    }

    const doctorFiltrado = {
      ...this.doctors,
      servicos: this.servicoSelecionado ? [this.servicoSelecionado] : this.doctors.servicos,
      convenios: this.convenioSelecionado ? [this.convenioSelecionado] : this.doctors.convenios,
      unidades: this.unidadeSelecionada ? [this.unidadeSelecionada] : this.doctors.unidades,
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

  public closeModal(): void {
    this.showModal = false;
  }
}