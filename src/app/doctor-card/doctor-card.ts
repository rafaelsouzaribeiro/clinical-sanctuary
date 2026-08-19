import { Component,Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import generateSlug from '../utils/generate.slug';

@Component({
  selector: 'app-doctor-card',
  imports: [RouterLink, NgClass],
  templateUrl: './doctor-card.html',
  styleUrl: './doctor-card.css',
})
export class DoctorCard {
  @Input() id!: string;
  @Input() slug!: string;
  @Input() acronym!: string;
  @Input() name!: string;
  @Input() status!: string;
  @Input() specialty!: string;
  @Input() crm!: string;
  @Input() phone!: string;
  @Input() unidade!: Array<{
    address: string;
    city: string;
    uf: string;
  }>;
  @Input() avatarIndex:number=0;

  get avatarClass(): string {
    const cycle = (this.avatarIndex % 3)+1;
    return `avatar--doctor-${cycle}`;
  }
  get consultaLink(): string[] {
    return ['/consultas', this.slug, this.id];
  }

  get perfilLink(): string[]{
    return ['/perfil', generateSlug(this.specialty), this.slug];
  }
}
