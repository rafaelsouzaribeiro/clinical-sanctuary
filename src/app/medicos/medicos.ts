import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  viewProviders:[Title],
  selector: 'app-medicos',
  imports: [],
  templateUrl: './medicos.html',
  styleUrl: './medicos.css',
})
export class Medicos {
  constructor(private title: Title) {
        this.title.setTitle('Médicos - Clinical Sanctuary');
    }
}
