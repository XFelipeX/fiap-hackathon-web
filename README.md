## Documentação Técnica do Projeto - FIAP Hackaton

Este é o projeto desenvolvido durante o hackathon do curso de pós-graduação em FullStack Development da FIAP.

Membros do grupo 37:

- Felipe Dias Amorim Pessoa - RM355212 - felipediasamorimpessoa@gmail.com
- Sérgio Percevallis Neto - RM354791 - sergioneto261001@gmail.com
- Thiago Scheffer Fialho - RM353477 - thiago.sch.fialho@gmail.com

### Introdução

Este documento apresenta uma visão detalhada do projeto desenvolvido no Hackathon da FIAP. A aplicação foi implementada utilizando React com TypeScript. Trata-se de uma interface web projetada para criar um ambiente acadêmico mais automatizado e organizado para professores e professoras do ensino público, incluindo rotas de autenticação e administração.

Neste documento, detalhamos os passos para instalação, configuração e execução da aplicação, além de oferecer uma visão geral da arquitetura e da stack tecnológica empregada.

### Setup Inicial

**Pré-requisitos:**

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em seu ambiente:

- nodejs v20+
- npm v10+
- TypeScript v5+

**Instalação:**

1. Clone o repositório:<br>
```
https://github.com/XFelipeX/fiap-hackathon-web.git
```
2. Navegue até a pasta do projeto:
```
cd fiap-hackathon-web
```
4. Instale as dependências:
```
npm install
```

**Configuração:**

1. Adicione as suas configurações do firebase no arquivo `firebase.js`

```js
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};
```

**Execução:**

1. Inicie o servidor de desenvolvimento:
```
npm start dev
```
2. Acesse `http://localhost:5173/`

## Arquitetura da Aplicação

O projeto adota uma abordagem modular, baseada em componentes reutilizáveis e funcionalidades independentes.

- Gerenciamento de Estados de Formulários: É feito com bibliotecas como formik e validações com yup.
- Banco de dados: Integrado ao Firestore DB.
- Autenticação: Gerenciada via Firebase Auth.
- Armazenamento em Nuvem: Gerenciada via Firebase storage.
- Rotas: Configuradas com React Router DOM.

## Estrutura de Pastas

- **src/**: Contém todo o código fonte da aplicação.
  - **components/**: Componentes reutilizáveis da interface.
  - **constants/**: Constantes utilizadas em toda a aplicação.
  - **context/**: Gerenciamento de contexto global da aplicação.
  - **hooks/**: Hooks personalizados
  - **pages/**: Páginas principais da aplicação, como:
    - **Class** : Página de listagem das turmas
    - **ClassForm**: Página com os formulários para criação e edição de turmas
    - **Home**: Página inicial
    - **Login**: Página de login do usuário.
    - **People**: Página de listagem dos professores e alunos
    - **PeopleForm**: Página com os formulários para criação e edição de professores e alunos
    - **Plan**: Página de listagem dos planos de ensino
    - **PlanForm**: Página com os formulários para criação e edição de planos de ensino
    - **PostResult**: Página de criação de tarefas e distribuição de pontos aos alunos
    - **Result**: Página de listagem das notas dos alunos
    - **StartLesson**: Página para dar início às aulas
    - **StudentResult**: Página onde mostra os detalhes do desempenho e situação do aluno
    - **Timeline**: Página de cronogramas
  - **routes/**: Configura as rotas da aplicação.
  - **services/**: Serviços para serviços em nuvem usando o Firebase.
 

## Rotas

### Rotas públicas:
  - `/login`: Página de login.

### Rotas privadas:
  - `/`: Página inicial.
  - `/plan`: Página de listagem dos planos de ensino.
  - `/planForm`: Formulário para criação de planos de ensino.
  - `/planForm/:id`: Formulário para edição de um plano de ensino específico.
  - `/class`: Página de listagem das turmas.
  - `/classform`: Formulário para criação de turmas.
  - `/classform/:id`: Formulário para edição de uma turma específica.
  - `/timeline`: Página de cronogramas.
  - `/startlesson`: Página para iniciar uma aula.
  - `/people`: Página de listagem de professores e alunos.
  - `/peopleform/:person`: Formulário para criação de um professor ou aluno.
  - `/peopleform/:person/:id`: Formulário para edição de um professor ou aluno específico.
  - `/result`: Página de listagem das notas dos alunos.
  - `/result/:id`: Página com detalhes do desempenho e situação de um aluno.
  - `/postResult`: Página de criação de tarefas e atribuição de pontos aos alunos.

## Stack utilizada

A stack tecnológica do projeto é composta por:

### **Frontend:**
- **React** com **TypeScript**
- **Vite** para construção do projeto
- **Styled-Components** para estilização
- **React Router DOM** para navegação entre páginas

### **Formulários e Validações:**
- **formik** para gerenciamento de formulários
- **Yup** para validação de dados

### **Bibliotecas auxiliares:**
- **Firebase** para autenticação e banco de dados
- **React Icons** para ícones na interface
- **LDRS** para animações de carregamento
