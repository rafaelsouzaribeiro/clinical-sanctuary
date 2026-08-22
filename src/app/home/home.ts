import { Component } from '@angular/core';
import { DoctorCard } from '../doctor-card/doctor-card';
import { Title } from '@angular/platform-browser';
import { HomeService } from '../services/impl/home.service';
import { Cidades } from '../cidades/cidades';

@Component({
  viewProviders: [Title, HomeService],
  selector: 'app-home',
  imports: [DoctorCard, Cidades],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {
    constructor(private title: Title) {
        this.title.setTitle('Home - Clinical Sanctuary');
    }

    public selectedUf = '';
    public selectedCity = '';
    public searchTerm = '';

    onUfChange(value: string): void {
        this.selectedUf = value;
    }

    onCityChange(value: string): void {
        this.selectedCity = value;
    }

    onSearchChange(value: string): void {
        this.searchTerm = value;
    }
}