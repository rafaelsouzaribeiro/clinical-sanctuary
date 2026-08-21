import { Component } from '@angular/core';
import { DoctorCard } from '../doctor-card/doctor-card';
import { SelectEventLocation } from '../select-event-location/select-event-location';
import {SelectOption} from "../select-event-location/interface.sellect-option";
import { Title } from '@angular/platform-browser';
import { HomeService } from '../services/impl/home.service';
import { Doctor } from '../services/iservice/home.interface';

@Component({
  viewProviders:[Title],
  selector: 'app-home',
  imports: [DoctorCard, SelectEventLocation],
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
    public ufOptions: SelectOption[] = [];
    public cityOptions: SelectOption[] = [];

    public selectedUf = '';
    public selectedCity = '';
    public searchTerm = '';

   public ngOnInit(): void {
    this.homeService.getDoctors().subscribe((doctors) => {
      this.doctors = doctors;
    });

    this.homeService.getUfOptions().subscribe((options) => {
      this.ufOptions = options;
      this.selectedUf = this.ufOptions[0]?.value ?? '';
      this.loadCities(this.selectedUf);
    });
  }

    private loadCities(uf: string): void {
        console.log('Loading cities for UF:', uf);
        this.homeService.getCityOptions(uf).subscribe((options) => {
            if (options.length > 0) {
                this.cityOptions = options;
                this.selectedCity = this.cityOptions[0].value;
            }
            console.log('City options loaded:', this.cityOptions);
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

  onUfChange(value: SelectOption): void {
      this.selectedUf = value.value;
      this.loadCities(this.selectedUf);
  }

  onCityChange(value: SelectOption): void {
      this.selectedCity = value.value;
  }

  onSearchChange(event: Event): void {
      const input = event.target as HTMLInputElement;
      this.searchTerm = input.value;
  }
}
