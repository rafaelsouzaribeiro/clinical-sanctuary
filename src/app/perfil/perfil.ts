import { Component } from '@angular/core';
import doctorsData from './doctors.json';
import commentsData from './comments.json';
import {RouterLink} from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-perfil',
  imports: [RouterLink],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil {
  public doctors = doctorsData;
  public comments = commentsData;

  constructor(private titleService: Title) {
    this.titleService.setTitle(`Perfil - ${this.doctors.specialty} - ${this.doctors.name}`);
  }

  get consultaLink():string[]{
    return ['/consultas', this.doctors.slug, this.doctors.id];
  }
}
