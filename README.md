## Tecnologias Utilizadas

### Backend (API)
* **Runtime**: Node.js, Express.js
* **Linguagem**: TypeScript
* **Banco de Dados**: PostgreSQL
* **ORM**: Prisma
* **Validação**: Zod
* **Documentação**: Swagger (OpenAPI)

### Frontend (Interface)
* **Framework/Build Tool**: React + Vite
* **Linguagem**: TypeScript
* **Estilização**: Tailwind CSS
* **Consumo de API**: Axios
* **Roteamento**: React Router DOM
* **Formulários & Validação**: React Hook Form + Zod
* **Ícones**: Lucide React

## Como Executar o Projeto

Siga os passos abaixo para configurar e executar a aplicação localmente.

### Pré-requisitos

* [Node.js](https://nodejs.org/) (versão 18 ou superior)
* [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
* Uma instância do **PostgreSQL** rodando na sua máquina ou em um container Docker.

### Passo a Passo

#### 1. Configuração do Backend (API)

1.  **Clone o repositório e instale as dependências da raiz:**
    ```bash
    git clone [https://github.com/seu-usuario/nome-do-repositorio.git](https://github.com/seu-usuario/nome-do-repositorio.git)
    cd nome-do-repositorio
    npm install
    ```

2.  **Configure as variáveis de ambiente do Backend:**
    * Na **raiz** do projeto, crie um arquivo chamado `.env`.
    * Configure a `DATABASE_URL` para o seu PostgreSQL:
        ```env
        # Arquivo: ./.env
        DATABASE_URL="postgresql://USUARIO:SENHA@localhost:5432/NOME_DO_BANCO?schema=public"
        PORT=3333
        ```

3.  **Configure o Banco de Dados:**
    * Execute as migrações para criar as tabelas (`Project`, `Experiment`, `Metric`):
    ```bash
    npx prisma migrate dev
    ```

4.  **Inicie o Servidor Backend:**
    ```bash
    npm run dev
    ```
    * O Backend estará rodando em: `http://localhost:3333`
    * Documentação Swagger: `http://localhost:3333/api-docs`

---

#### 2. Configuração do Frontend (Interface)

**Mantenha o terminal do backend rodando** e abra um **novo terminal** para os passos abaixo.

1.  **Entre na pasta do frontend e instale as dependências:**
    ```bash
    cd frontend
    npm install
    ```

2.  **Configure as variáveis de ambiente do Frontend:**
    * Dentro da pasta `frontend`, crie um arquivo chamado `.env`.
    * Defina a URL da API (Backend):
        ```env
        # Arquivo: ./frontend/.env
        VITE_API_URL=http://localhost:3333
        ```

3.  **Inicie o Servidor Frontend:**
    ```bash
    npm run dev
    ```

4.  **Acesse a Aplicação:**
    * Abra seu navegador em: `http://localhost:5173` (ou a porta indicada no terminal).

---

## Estrutura do Projeto

* **`/src`**: Código fonte do Backend (Controllers, Services, Routes, Prisma).
* **`/frontend`**: Código fonte do Frontend React.
* **`/prisma`**: Schemas e migrações do banco de dados.