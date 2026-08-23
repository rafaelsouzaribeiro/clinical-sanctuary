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