## Tecnologias Utilizadas

* **Backend**: Node.js, Express.js
* **Linguagem**: TypeScript
* **Banco de Dados**: PostgreSQL
* **ORM**: Prisma
* **Validação**: Zod
* **Documentação**: Swagger (OpenAPI)

## Como Executar o Projeto

Siga os passos abaixo para configurar e executar a aplicação localmente.

### Pré-requisitos

* [Node.js](https://nodejs.org/) (versão 18 ou superior)
* [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
* Uma instância do **PostgreSQL** rodando na sua máquina ou em um container Docker.

### Passos

1.  **Clone o repositório**
    ```bash
    git clone [https://github.com/seu-usuario/nome-do-repositorio.git](https://github.com/seu-usuario/nome-do-repositorio.git)
    cd nome-do-repositorio
    ```

2.  **Instale as dependências**
    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente**
    * Na raiz do projeto, crie um arquivo chamado `.env`.
    * Abra o arquivo `.env` e configure a sua `DATABASE_URL` para se conectar ao seu banco de dados PostgreSQL.
        ```env
        # Exemplo:
        DATABASE_URL="postgresql://USUARIO:SENHA@HOST:PORTA/NOME_DO_BANCO"
        ```

4.  **Execute as migrações do Prisma**
    * Este comando irá criar as tabelas (`Project`, `Experiment`, `Metric`) no seu banco de dados com base no schema definido.
    ```bash
    npx prisma migrate dev
    ```

5.  **Inicie o servidor de desenvolvimento**
    * O servidor irá iniciar e recarregar automaticamente a cada alteração no código.
    ```bash
    npm run dev
    ```

6.  **Fim**
    * O servidor estará rodando em `http://localhost:3333`.
    * A documentação interativa da API estará disponível em **`http://localhost:3333/api-docs`**.
