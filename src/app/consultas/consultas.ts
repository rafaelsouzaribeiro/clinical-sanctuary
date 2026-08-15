import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationSelect } from '../location-select/location-select';
import { ActivatedRoute,Router } from '@angular/router'; 

interface DiaCalendario {
  numero: number;
  isMuted: boolean;
  isActive: boolean;
}

@Component({
  selector: 'app-consultas',
  standalone: true,
  imports: [LocationSelect, CommonModule],
  templateUrl: './consultas.html',
  styleUrl: './consultas.css',
})
export class Consultas implements OnInit {
  medicoId:string | null = null;
  medico: {
    id: string;
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

  pagamentoOptions: Array<{ value: string; label: string }> = [
    { value: 'cartao', label: 'Cartão de Crédito' },
    { value: 'boleto', label: 'Boleto Bancário' },
    { value: 'pix', label: 'PIX' },
  ];
  convenioOptions: Array<{ value: string; label: string }> = [
    { value: 'particular', label: 'Particular' },
    { value: 'unimed', label: 'Unimed' },
    { value: 'amil', label: 'Amil' },
    { value: 'bradesco', label: 'Bradesco Saúde' },
    { value: 'sulamerica', label: 'SulAmérica' },
  ];
  unidadeOptions: Array<{ value: string; label: string }> = [
    { value: 'unidade1', label: 'Clínica Central - Salto de Pirapora, SP' },
    { value: 'unidade2', label: 'Clínica Norte - São Paulo, SP' },
    { value: 'unidade3', label: 'Clínica Sul - Campinas, SP' },
  ];
  servicoOptions: Array<{ value: string; label: string }> = [
    { value: 'consulta', label: 'Consulta - R$ 150,00' },
    { value: 'exame', label: 'Exame - R$ 80,00' },
  ];

  data: Date = new Date();
  weekdays: string[] = [];
  calendarDays: DiaCalendario[] = [];
  mesTitulo: string = '';

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

    this.atualizarTituloMes();
    this.atualizarDiasDaSemana();
    this.atualizarCalendario();
  }

  mesAnterior(): void {
    this.data.setMonth(this.data.getMonth() - 1);
    this.atualizarTituloMes();
    this.atualizarDiasDaSemana();
    this.atualizarCalendario();
  }

  proximoMes(): void {
    this.data.setMonth(this.data.getMonth() + 1);
    this.atualizarTituloMes();
    this.atualizarDiasDaSemana();
    this.atualizarCalendario();
  }

  private atualizarTituloMes(): void {
    const nomeDoMes = this.data.toLocaleString('pt-BR', { month: 'long' });
    const ano = this.data.getFullYear();
    this.mesTitulo = `${nomeDoMes.charAt(0).toUpperCase() + nomeDoMes.slice(1)} - ${ano}`;
  }

  private atualizarDiasDaSemana(): void {
    const dias: string[] = [];
    let dataReferencia = new Date(this.data.getFullYear(), this.data.getMonth(), 1);
    dataReferencia.setDate(dataReferencia.getDate() - dataReferencia.getDay());

    for (let i = 0; i < 7; i++) {
      const nomeDia = dataReferencia
        .toLocaleString('pt-BR', { weekday: 'short' })
        .replace('.', '')
        .toUpperCase();
      dias.push(nomeDia);
      dataReferencia.setDate(dataReferencia.getDate() + 1);
    }
    this.weekdays = dias;
  }

  private atualizarCalendario(): void {
    const ano = this.data.getFullYear();
    const mes = this.data.getMonth();
    const primeiroDiaDoMes = new Date(ano, mes, 1);
    const ultimoDiaDoMes = new Date(ano, mes + 1, 0);
    const totalDiasMesAtual = ultimoDiaDoMes.getDate();
    const diaSemanaPrimeiroDia = primeiroDiaDoMes.getDay();
    const ultimoDiaMesAnterior = new Date(ano, mes, 0).getDate();

    const dias: DiaCalendario[] = [];
    const hoje = new Date();

    for (let i = diaSemanaPrimeiroDia; i > 0; i--) {
      dias.push({ numero: ultimoDiaMesAnterior - i + 1, isMuted: true, isActive: false });
    }

    for (let dia = 1; dia <= totalDiasMesAtual; dia++) {
      const isHoje =
        dia === hoje.getDate() &&
        mes === hoje.getMonth() &&
        ano === hoje.getFullYear();
      dias.push({ numero: dia, isMuted: false, isActive: isHoje });
    }

    const totalEspacosGrid = 42;
    const espacosPreenchidos = diaSemanaPrimeiroDia + totalDiasMesAtual;
    const diasRestantes = totalEspacosGrid - espacosPreenchidos;

    for (let dia = 1; dia <= diasRestantes; dia++) {
      dias.push({ numero: dia, isMuted: true, isActive: false });
    }

    this.calendarDays = dias;
  }

  selecionarDia(diaClicado: DiaCalendario): void {
    this.calendarDays.forEach((d) => (d.isActive = false));
    diaClicado.isActive = true;
  }

  selecionarHorario(horario: string): void {
    this.horarioSelecionado = horario;
  }

}