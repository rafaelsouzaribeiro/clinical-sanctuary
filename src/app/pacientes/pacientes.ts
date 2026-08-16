import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  viewProviders:[Title],  
  selector: 'app-pacientes',
  imports: [],
  templateUrl: './pacientes.html',
  styleUrl: './pacientes.css',
})
export class Pacientes {
  constructor(private title: Title) {
        this.title.setTitle('Pacientes - Clinical Sanctuary');
    }
}
