import { Component,Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-doctor-card',
  imports: [RouterLink],
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

   get specialtySlug(): string {
    return this.specialty
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  }

  get consultaLink(): string[] {
    return ['/consultas', this.slug, this.id];
  }

  get perfilLink(): string[]{
    return ['/perfil', this.specialtySlug, this.slug];
  }
}
