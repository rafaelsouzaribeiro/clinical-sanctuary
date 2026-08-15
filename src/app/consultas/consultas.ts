import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationSelect } from '../location-select/location-select';
import { ActivatedRoute,Router } from '@angular/router';
import { SelectOption } from '../location-select/interface.sellect-option';
import { SelectEventLocation } from '../select-event-location/select-event-location';
import { Calendar } from './calendar';
import { DiaCalendario } from './interface.dia.calendario';
 
@Component({
  selector: 'app-consultas',
  standalone: true,
  imports: [LocationSelect, CommonModule, SelectEventLocation],
  templateUrl: './consultas.html',
  styleUrl: './consultas.css',
})
export class Consultas implements OnInit {
  medicoId:string | null = null;
  medico: {
    id: string;
    slug: string;
    acronym: string;
    name: string;
    status: string;
    specialty: string;
    phone: string;
    address: string;
    crm: string;
  } | undefined;

 doctors:Array<{
      id:string;
      slug:string;
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
      slug:"dr-john-smith",
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
      slug:"dr-mary-johnson",
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
      slug:"dr-luke-williams",
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
      slug:"dr-emily-smith",
      acronym:'ES',
      name: 'Dr. Emily Smith',
      status:'Ativo',
      specialty:'Pediatra',
      phone:'(11) 4321-8765',
      address:'Ala Oeste, Sala 110',
      crm:'456789-SP',
    }
  ]
  public calendar:Calendar = new Calendar();

  pagamentoOptions: SelectOption[] = [
    { value: 'cartao', label: 'Cartão de Crédito' },
    { value: 'boleto', label: 'Boleto Bancário' },
    { value: 'pix', label: 'PIX' },
  ];
  convenioOptions: SelectOption[] = [
    { value: 'particular', label: 'Particular' },
    { value: 'unimed', label: 'Unimed' },
    { value: 'amil', label: 'Amil' },
    { value: 'bradesco', label: 'Bradesco Saúde' },
    { value: 'sulamerica', label: 'SulAmérica' },
  ];
  unidadeOptions: SelectOption[] = [
    { value: 'Clínica Central - Salto de Pirapora, SP', label: 'Clínica Central - Salto de Pirapora, SP' },
    { value: 'Clínica Norte - São Paulo, SP', label: 'Clínica Norte - São Paulo, SP' },
    { value: 'Clínica Sul - Campinas, SP', label: 'Clínica Sul - Campinas, SP' },
  ];
  servicoOptions: SelectOption[] = [
    { value: 'consulta', label: 'Consulta - R$ 150,00' },
    { value: 'exame', label: 'Exame - R$ 80,00' },
  ];

  weekdays: string[] = [];
  mesTitulo : string = '';
  unidade:string = this.unidadeOptions[0].label.split(' - ')[0];
  city:string = this.unidadeOptions[0].label.split(' - ')[1];

  calendarDays: DiaCalendario[] = [];
  horarios: string[] = ['08:00', '09:30', '10:45', '13:00', '14:30', '16:00'];
  horarioSelecionado: string = '10:45';
  consultaFocoSelecionado: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.medicoId = this.route.snapshot.paramMap.get('id');
    this.medico = this.doctors.find((d) => d.id === this.medicoId);

     if (!this.medico) {
      this.router.navigate(['/not-found']);
      return;
    }

    this.calendar.atualizarTituloMes();
    this.calendar.atualizarDiasDaSemana();
    this.calendar.atualizarCalendario();
  }

  public selecionarDia(diaClicado: DiaCalendario): void {
    this.calendar.calendarDays.forEach((d) => (d.isActive = false));
    diaClicado.isActive = true;
  }

  public selecionarHorario(horario: string): void {
    this.horarioSelecionado = horario;
  }

  public onUnidadeChange(opcaoSelecionada: SelectOption): void {
    this.unidade = opcaoSelecionada.value.split(' - ')[0];
    this.city = opcaoSelecionada.value.split(' - ')[1];
  }
}