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
      acronym: string;
      name: string;
      status: string;
      specialty: string;
      phone: string;
      address: string;
      crm: string;
    }>=[
    {
      acronym:'RS',
      name: 'Dr. John Smith',
      status:'Ativo',
      specialty:'Cardiologista',
      phone:'(11) 1234-5678',
      address:'Ala Norte, Sala 402',
      crm:'123456-SP'

    },
    {
      acronym:'MJ',
      name: 'Dr. Mary Johnson',
      status:'Ativo',
      specialty:'Dermatologista',
      phone:'(11) 9876-5432',
      address:'Ala Sul, Sala 305',
      crm:'654321-SP'
    },
    {
      acronym:'LW',
      name: 'Dr. Luke Williams',
      status:'Inativo',
      specialty:'Neurologista',
      phone:'(11) 5678-1234',
      address:'Ala Leste, Sala 210',
      crm:'987654-SP'
    },
    {
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
