# ClinicalSanctuary

Diretório médico desenvolvido em **Angular** com backend mockado via **JSON Server**.

---

## 🛠️ Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:
* [Node.js](https://nodejs.org/) (versão LTS recomendada)
* [npm](https://www.npmjs.com/) (gerenciador de pacotes do Node)
* [Angular CLI](https://angular.dev/tools/cli) version 22.1.3

---

## 🚀 Como Executar o Projeto

Você precisará de dois terminais abertos: um para rodar a API (JSON Server) e outro para a aplicação Angular.

### 1. Iniciar o Backend (JSON Server)

No primeiro terminal, na raiz do projeto (onde está o arquivo `db.json`), instale e execute o JSON Server:

```bash
# Instalação global do JSON Server (caso não tenha instalado)
npm install -g json-server

# Execução do banco de dados mockado na porta 3000
json-server --watch db.json --port 3000

```

Nota: A API estará acessível em `http://localhost:3000/`

### 2. Iniciar a Aplicação Angular

No segundo terminal, instale as dependências e rode o servidor de desenvolvimento:

# Instalar as dependências do projeto
npm install

# Iniciar o servidor de desenvolvimento do Angular
ng serve

Navegue para `http://localhost:4200/`. A aplicação será recarregada automaticamente se você alterar qualquer arquivo fonte.

## 🗄️ Estrutura do Banco de Dados (`db.json`)

Para que as consultas e agendamentos funcionem corretamente, o arquivo `db.json` deve associar os horários disponíveis (`availableTimes`) ao identificador do perfil do médico (`idDoctor`).

Exemplo da estrutura do `db.json`:

```json
{
  "doctorProfile": [
    {
      "id": "1ef335ed-c98f-4f2a-a5ec-2461615a147b",
      "name": "Dr. Exemplo",
      "specialty": "Cardiologia"
    }
  ],
  "availableTimes": [
    { "idDoctor": "1ef335ed-c98f-4f2a-a5ec-2461615a147b", "date": "2026-08-24", "availableTimes": ["08:00", "10:30", "14:00"] },
    { "idDoctor": "1ef335ed-c98f-4f2a-a5ec-2461615a147b", "date": "2026-08-25", "availableTimes": ["08:00", "09:30", "15:00"] },
    { "idDoctor": "1ef335ed-c98f-4f2a-a5ec-2461615a147b", "date": "2026-08-26", "availableTimes": ["08:00", "11:00"] },
    { "idDoctor": "1ef335ed-c98f-4f2a-a5ec-2461615a147b", "date": "2026-08-27", "availableTimes": ["09:00", "13:30", "16:00"] },
    { "idDoctor": "1ef335ed-c98f-4f2a-a5ec-2461615a147b", "date": "2026-08-28", "availableTimes": ["08:00", "10:00"] },
    { "idDoctor": "1ef335ed-c98f-4f2a-a5ec-2461615a147b", "date": "2026-08-29", "availableTimes": ["09:00", "11:30"] },
    { "idDoctor": "1ef335ed-c98f-4f2a-a5ec-2461615a147b", "date": "2026-08-30", "availableTimes": ["08:30"] },
    { "idDoctor": "1ef335ed-c98f-4f2a-a5ec-2461615a147b", "date": "2026-08-31", "availableTimes": ["08:00", "14:00"] }
  ]
}
```json