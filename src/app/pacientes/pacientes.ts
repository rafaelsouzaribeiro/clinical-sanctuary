import { Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AlertModal } from '../alert-modal/alert-modal'; 

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [ReactiveFormsModule, AlertModal],
  templateUrl: './pacientes.html',
  styleUrl: './pacientes.css',
})
export class Pacientes {
  private fb = inject(FormBuilder);
  private title = inject(Title);

  pacienteForm!: FormGroup;
  showModal = false;
  message = '';

  private readonly labelsCampos: Record<string, string> = {
    nome: 'Nome Completo',
    nascimento: 'Data de Nascimento',
    email: 'Email de Contato',
    cpf: 'CPF',
    rg: 'RG',
    cep: 'CEP',
    logradouro: 'Rua / Logradouro',
    numero: 'Número',
    bairro: 'Bairro',
    cidade: 'Cidade',
    uf: 'UF',
    senha: 'Senha',
    confirmarSenha: 'Confirmar Senha',
  };

  constructor() {
    this.title.setTitle('Pacientes - Clinical Sanctuary');
    this.criarFormulario();
  }

  private criarFormulario(): void {
    this.pacienteForm = this.fb.group(
      {
        fotoPaciente: [''],
        nome: ['', Validators.required],
        nascimento: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/)]],
        rg: ['', Validators.required],
        cep: ['', Validators.required],
        logradouro: ['', Validators.required],
        numero: ['', Validators.required],
        complemento: [''],
        bairro: ['', Validators.required],
        cidade: ['', Validators.required],
        uf: ['SP', Validators.required],
        senha: ['', [Validators.required, Validators.minLength(6)]],
        confirmarSenha: ['', Validators.required],
      },
      { validators: this.validarSenhasIguais }
    );
  }

  private validarSenhasIguais(group: AbstractControl): ValidationErrors | null {
    const senha = group.get('senha')?.value;
    const confirmarSenha = group.get('confirmarSenha')?.value;
    return senha && confirmarSenha && senha !== confirmarSenha ? { senhasDiferentes: true } : null;
  }

  onSubmit(): void {
    if (this.pacienteForm.invalid) {
      this.pacienteForm.markAllAsTouched();
      
      const erros = this.obterErrosDoFormulario(this.pacienteForm);
      this.message = Array.from(erros).join('<br />• ');
      this.showModal = true;
      
      this.focarPrimeiroCampoInvalido();
      return;
    }

    console.log('Dados do Paciente:', this.pacienteForm.value);
    alert('Formulário enviado com sucesso!');
  }

  isCampoInvalido(campo: string): boolean {
    const control = this.pacienteForm.get(campo);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }

  private focarPrimeiroCampoInvalido(): void {
    const primeiroInvalido = document.querySelector<HTMLElement>('form .ng-invalid:not(form):not(div):not(section)');
    if (primeiroInvalido) {
      primeiroInvalido.focus();
      primeiroInvalido.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  private obterErrosDoFormulario(
    formGroup: FormGroup,
    errosEncontrados: Set<string> = new Set()
  ): Set<string> {
    if (formGroup.hasError('senhasDiferentes')) {
      errosEncontrados.add('Confirmar Senha (não confere com a senha)');
    }

    for (const [key, control] of Object.entries(formGroup.controls)) {
      if (!control) continue;

      if (control.invalid) {
        const labelAmigavel = this.labelsCampos[key] ?? key;
        errosEncontrados.add(labelAmigavel);
      }
    }

    return errosEncontrados;
  }
}