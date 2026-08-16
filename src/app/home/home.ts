import { Component } from '@angular/core';
import { DoctorCard } from '../doctor-card/doctor-card';
import { SelectEventLocation } from '../select-event-location/select-event-location';
import {SelectOption} from "../location-select/interface.sellect-option";
import { Title } from '@angular/platform-browser';

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
    }>=[
    {
      id:"1ef335ed-c98f-4f2a-a5ec-2461615a147b",
      slug:"dr-john-smith",
      acronym:'RS',
      name: 'Dr. John Smith',
      status:'Ativo',
      specialty:'Cardiologista',
      phone:'(11) 1234-5678',
      unidade:[
        { 
          address:"Ala Norte, Sala 402",
          city:"Sorocaba",
          uf:"SP"
        }
      ],
      crm:'123456-SP'

    },
    {
      id:"2ab456cd-ef12-3456-7890-abcdef123456",
      slug:"dr-mary-johnson",
      acronym:'MJ',
      name: 'Dr. Mary Johnson',
      status:'Ativo',
      specialty:'Dermatologista',
      phone:'(11) 9876-5432',
      unidade:[
        { 
          address:"Ala Suldeste, Sala 90",
          city:"Sorocaba",
          uf:"SP"
        }
      ],
      crm:'654321-SP'
    },
    {
      id:"3cd789ef-4567-8901-2345-abcdef678901",
      slug:"dr-luke-williams",
      acronym:'LW',
      name: 'Dr. Luke Williams',
      status:'Inativo',
      specialty:'Neurologista',
      phone:'(11) 5678-1234',
      unidade:[
        { 
          address:"Ala Norte, Sala 120",
          city:"Pilar do Sul",
          uf:"SP"
        }
      ],
      crm:'987654-SP'
    },
    {
      id:"4ef012gh-5678-9012-3456-abcdef890123",
      slug:"dr-emily-smith",
      acronym:'ES',
      name: 'Dr. Emily Smith',
      status:'Ativo',
      specialty:'Pediatra',
      phone:'(11) 4321-8765',
      unidade:[
        { 
          address:"Ala Oeste, Sala 110",
          city:"Salto de Pirapora",
          uf:"SP"
        }
      ],
      crm:'456789-SP'
    }
  ]

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
