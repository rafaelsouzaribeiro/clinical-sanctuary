import { Component } from '@angular/core';
import { DoctorCard } from '../doctor-card/doctor-card';
import { Title } from '@angular/platform-browser';
import { HomeService } from '../services/impl/home.service';
import { Doctor } from '../services/iservice/home.interface';
import { Cidades } from '../cidades/cidades';

@Component({
  viewProviders: [Title, HomeService],
  selector: 'app-home',
  imports: [DoctorCard, Cidades],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {
    constructor(
        private title: Title,
        private homeService: HomeService
    ) {
        this.title.setTitle('Home - Clinical Sanctuary');
    }

    public doctors: Doctor[] = [];

    public selectedUf = '';
    public selectedCity = '';
    public searchTerm = '';

    public ngOnInit(): void {
        this.homeService.getDoctors().subscribe((doctors) => {
            this.doctors = doctors;
        });
    }

    get filteredDoctors() {
        return this.doctors.filter(doctor => {
            const matchesUf =
                !this.selectedUf ||
                doctor.unidade.some(u => u.uf === this.selectedUf);
            const matchesCity =
                !this.selectedCity ||
                doctor.unidade.some(u => u.city === this.selectedCity);
            const matchesSearch =
                !this.searchTerm ||
                doctor.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                doctor.specialty.toLowerCase().includes(this.searchTerm.toLowerCase());

            return matchesUf && matchesCity && matchesSearch;
        });
    }

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