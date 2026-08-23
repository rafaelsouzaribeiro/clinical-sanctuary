import { Component } from '@angular/core';
import { DoctorCard } from './doctor-card/doctor-card';
import { Title } from '@angular/platform-browser';
import { Cidades } from './cidades/cidades';

@Component({
  viewProviders: [Title],
  selector: 'app-home',
  imports: [DoctorCard, Cidades],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {
    constructor(private title: Title) {
        this.title.setTitle('Home - Clinical Sanctuary');
    }

    public selectedCity = '';
    public searchTerm = '';


    onCityChange(value: string): void {
        this.selectedCity = value;
    }

    onSearchChange(value: string): void {
        this.searchTerm = value;
    }
}