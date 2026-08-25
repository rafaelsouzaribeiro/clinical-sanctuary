import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AlertModal } from '../alert-modal/alert-modal';



@Component({
  selector: 'app-medicos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AlertModal],
  templateUrl: './medicos.html',
  styleUrl: './medicos.css',
  viewProviders: [Title]
})
export class Medicos {
  public medicoForm!: FormGroup;
  public showModal: boolean = false;
  public message: string = '';

  private labelsCampos: Record<string, string> = {
    nome: 'Nome',
    nascimento: 'Data de Nascimento',
    email: 'E-mail',
    crm: 'CRM',
    especialidade: 'Especialidade',
    descricao: 'Descrição',
    senha: 'Senha',
    confirmarSenha: 'Confirmar Senha',
    campo: 'Nome do Serviço',
    campo_valor: 'Valor do Serviço',
    modalidadePagamento: 'Forma de Pagamento',
    nomeUnidade: 'Nome da Unidade',
    cep: 'CEP',
    logradouro: 'Logradouro',
    numero: 'Número',
    bairro: 'Bairro',
    uf: 'UF',
    cidade: 'Cidade',
    complemento: 'Complemento',
    googleMaps: 'Link do Google Maps',
    telefone: 'Telefone',
    convenio: 'Convênio'
  };

  constructor(
    private title: Title,
    private fb: FormBuilder
  ) {
    this.title.setTitle('Médicos - Clinical Sanctuary');
  }

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  private inicializarFormulario(): void {
    this.medicoForm = this.fb.group({
      fotoPaciente: [null],
      nome: ['', Validators.required],
      nascimento: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      crm: ['', Validators.required],
      especialidade: ['', Validators.required],
      descricao: [''],
      
      servicos: this.fb.array([this.criarGrupoServico()]),
      modalidades: this.fb.array([this.criarGrupoModalidade()]),
      unidades: this.fb.array([this.criarGrupoUnidade()]),
      convenios: this.fb.array([this.criarGrupoConvenio()]),
      
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', Validators.required]
    }, { validators: this.validarSenhasIguais });
  }

  private validarSenhasIguais(group: AbstractControl): ValidationErrors | null {
    const senha = group.get('senha')?.value;
    const confirmarSenha = group.get('confirmarSenha')?.value;
    return senha === confirmarSenha ? null : { senhasDiferentes: true };
  }

  isCampoInvalido(nomeCampo: string): boolean {
    const campo = this.medicoForm.get(nomeCampo);
    return !!(campo && campo.invalid && (campo.touched || campo.dirty));
  }

  get servicos(): FormArray {
    return this.medicoForm.get('servicos') as FormArray;
  }

  get modalidades(): FormArray {
    return this.medicoForm.get('modalidades') as FormArray;
  }

  get unidades(): FormArray {
    return this.medicoForm.get('unidades') as FormArray;
  }

  get convenios(): FormArray {
    return this.medicoForm.get('convenios') as FormArray;
  }

  criarGrupoServico(): FormGroup {
    return this.fb.group({
      campo: ['', Validators.required],
      campo_valor: ['', Validators.required]
    });
  }

  criarGrupoModalidade(): FormGroup {
    return this.fb.group({
      modalidadePagamento: ['PIX', Validators.required],
    });
  }

  criarGrupoUnidade(): FormGroup {
    return this.fb.group({
      nomeUnidade: ['', Validators.required],
      cep: ['', Validators.required],
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: ['', Validators.required], 
      bairro: ['', Validators.required],
      uf: ['SP', Validators.required],
      cidade: ['', Validators.required],
      googleMaps: ['', Validators.required],
      telefone: ['', Validators.required]
    });
  }

  criarGrupoConvenio(): FormGroup {
    return this.fb.group({
      convenio: ['UNIMED']
    });
  }

  adicionarServico(): void {
    this.servicos.push(this.criarGrupoServico());
  }

  adicionarModalidade(): void {
    this.modalidades.push(this.criarGrupoModalidade());
  }

  adicionarUnidade(): void {
    this.unidades.push(this.criarGrupoUnidade());
  }

  adicionarConvenio(): void {
    this.convenios.push(this.criarGrupoConvenio());
  }

  removerServico(index: number): void {
    if (this.servicos.length > 1) {
      this.servicos.removeAt(index);
    }
  }

  removerModalidade(index: number): void {
    if (this.modalidades.length > 1) {
      this.modalidades.removeAt(index);
    }
  }

  removerUnidade(index: number): void {
    if (this.unidades.length > 1) {
      this.unidades.removeAt(index);
    }
  }

  removerConvenio(index: number): void {
    if (this.convenios.length > 1) {
      this.convenios.removeAt(index);
    }
  }

  private obterErrosDoFormulario(formGroup: FormGroup | FormArray, errosEncontrados: Set<string> = new Set()): Set<string> {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);

      if (control instanceof FormGroup || control instanceof FormArray) {
        this.obterErrosDoFormulario(control, errosEncontrados);
      } else if (control && control.invalid) {
        const labelAmigavel = this.labelsCampos[key] || key;
        errosEncontrados.add(labelAmigavel);
      }
    });

    if (formGroup.hasError('senhasDiferentes')) {
      errosEncontrados.add('Confirmar Senha (não confere com a senha)');
    }

    return errosEncontrados;
  }

  onSubmit(): void {
    this.medicoForm.markAllAsTouched();

    if (this.medicoForm.invalid) {
      const erros = Array.from(this.obterErrosDoFormulario(this.medicoForm));
      
      this.message = erros.map(campo => `• <strong>${campo}</strong>`).join('<br />');
      this.showModal = true;
      return; 
    }

    console.log('Formulário válido! Enviando dados:', this.medicoForm.value);
    alert('Formulário enviado com sucesso!');
  }
}