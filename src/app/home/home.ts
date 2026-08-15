import { Component } from '@angular/core';
import { DoctorCard } from '../doctor-card/doctor-card';
import { LocationSelect } from '../location-select/location-select';
import {SelectOption} from "../location-select/interface.sellect-option";

@Component({
  selector: 'app-home',
  imports: [DoctorCard, LocationSelect],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
    doctors:Array<{
      id:string;
      acronym: string;
      name: string;
      status: string;
      specialty: string;
      phone: string;
      address: string;
      crm: string;
    }>=[
    {
      id:"1ef335ed-c98f-4f2a-a5ec-2461615a147b",
      acronym:'RS',
      name: 'Dr. John Smith',
      status:'Ativo',
      specialty:'Cardiologista',
      phone:'(11) 1234-5678',
      address:'Ala Norte, Sala 402',
      crm:'123456-SP'

    },
    {
      id:"2ab456cd-ef12-3456-7890-abcdef123456",
      acronym:'MJ',
      name: 'Dr. Mary Johnson',
      status:'Ativo',
      specialty:'Dermatologista',
      phone:'(11) 9876-5432',
      address:'Ala Sul, Sala 305',
      crm:'654321-SP'
    },
    {
      id:"3cd789ef-4567-8901-2345-abcdef678901",
      acronym:'LW',
      name: 'Dr. Luke Williams',
      status:'Inativo',
      specialty:'Neurologista',
      phone:'(11) 5678-1234',
      address:'Ala Leste, Sala 210',
      crm:'987654-SP'
    },
    {
      id:"4ef012gh-5678-9012-3456-abcdef890123",
      acronym:'ES',
      name: 'Dr. Emily Smith',
      status:'Ativo',
      specialty:'Pediatra',
      phone:'(11) 4321-8765',
      address:'Ala Oeste, Sala 110',
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
    { value: 'salto-pirapora', label: 'Salto de Pirapora' },
    { value: 'pilar-sul', label: 'Pilar do Sul' }
  ];
}
