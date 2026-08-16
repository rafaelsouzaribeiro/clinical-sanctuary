import { Component } from '@angular/core';
import { DoctorCard } from '../doctor-card/doctor-card';
import { SelectEventLocation } from '../select-event-location/select-event-location';
import {SelectOption} from "../location-select/interface.sellect-option";
import { Title } from '@angular/platform-browser';
import doctorsData from './doctors.json';

@Component({
  viewProviders:[Title],
  selector: 'app-home',
  imports: [DoctorCard, SelectEventLocation],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
    constructor(private title: Title) {
        this.title.setTitle('Home - Clinical Sanctuary');
    }
    public doctors:Array<{
      id:string;
      slug:string;
      acronym: string;
      name: string;
      status: string;
      specialty: string;
      phone: string;
      unidade: Array<{
        address: string;
        city: string;
        uf: string;
      }>;
      crm: string;
    }>=doctorsData;

  ufOptions: SelectOption[] = [
    { value: 'SP', label: 'SP' },
    { value: 'RJ', label: 'RJ' },
    { value: 'MG', label: 'MG' },
    { value: 'PR', label: 'PR' }
  ];

  cityOptions: SelectOption[] = [
    { value: 'Salto de Pirapora', label: 'Salto de Pirapora' },
    { value: 'Pilar do Sul', label: 'Pilar do Sul' }
  ];

  selectedUf = this.ufOptions[0]?.value ?? '';
  selectedCity = this.cityOptions[0]?.value ?? '';
  searchTerm = '';

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
  }

  onCityChange(value: SelectOption): void {
      this.selectedCity = value.value;
  }

  onSearchChange(event: Event): void {
      const input = event.target as HTMLInputElement;
      this.searchTerm = input.value;
  }
}
