import { Component } from '@angular/core';
import doctorsData from './doctors.json';
import commentsData from './comments.json';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-perfil',
  imports: [RouterLink],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil {
  public doctors = doctorsData;
  public comments = commentsData;

  ngOnInit():void{

  }

  get consultaLink():string[]{
    return ['/consultas', this.doctors.slug, this.doctors.id];
  }
}
