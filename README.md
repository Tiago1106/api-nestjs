# Backend API — NestJS + Arquitetura Hexagonal

Este projeto é uma API backend desenvolvida em **NestJS**, seguindo os princípios da  
**Arquitetura Hexagonal (Ports & Adapters)**.

## Backend API — NestJS + Arquitetura Hexagonal

API backend construída com NestJS seguindo princípios da Arquitetura Hexagonal (Ports & Adapters).

## Sumário

- Descrição
- Requisitos
- Instalação rápida
- Variáveis de ambiente
- Banco de dados (Prisma)
- Scripts úteis
- Documentação (Swagger)
- Testes

## Descrição

Projeto exemplo usando camadas separadas: Domain, Application e Infrastructure. Ideal para manter baixo acoplamento e testabilidade.

## Requisitos

- Node.js v18+ (recomendado)
- npm ou yarn
- PostgreSQL (ou outro compatível com Prisma)

## Instalação rápida

1. Instale dependências:

```bash
npm install
# ou
yarn
```

2. Crie um arquivo `.env` com a string de conexão (exemplo abaixo).

3. Gere o cliente Prisma e rode migrações (desenvolvimento):

```bash
npx prisma generate
npx prisma migrate dev --name init
```

4. Rode em modo desenvolvimento:

```bash
npm run start:dev
# ou
yarn start:dev
```

O servidor roda por padrão em `http://localhost:3000`.

## Variáveis de ambiente

Crie `.env` na raiz com a variável principal:

```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
PORT=3000
```

Substitua `USER`, `PASSWORD`, `HOST`, `PORT` e `DATABASE` conforme seu ambiente.

Você pode alterar a porta definindo `PORT` no `.env`. Se não definida, o servidor usará a porta `3000` por padrão.

## Banco de dados (Prisma)

O projeto usa Prisma. O arquivo de schema está em `prisma/schema.prisma` e espera a variável `DATABASE_URL`.

- Desenvolvimento: `npx prisma migrate dev --name <nome>`
- Produção: `npx prisma migrate deploy`
- Gerar cliente: `npx prisma generate`

## Scripts úteis

- `npm run start` — Inicia o app (produção)
- `npm run start:dev` — Inicia em modo watch (desenvolvimento)
- `npm run start:debug` — Inicio em modo debug
- `npm run build` — Compila o projeto
- `npm run lint` — Roda ESLint e corrige problemas

Você também pode usar `npx tsc --noEmit` para checar tipos sem emitir.

## Documentação (Swagger)

A documentação Swagger fica disponível em: `http://localhost:3000/api`

## Testes

Este repositório inclui dependências para Jest, mas não há script `test` no `package.json` por padrão.

Para rodar testes com Jest (se existirem):

```bash
npx jest
```

Para adicionar um script de teste, adicione no `package.json` uma entrada `"test": "jest"`.

## Boas práticas para criar novas rotas

1. Domain
- Criar entidade
- Criar interface de repositório

2. Application
- Criar Use Case
- Criar erros de negócio

3. Infrastructure
- Criar Controller
- Criar DTO HTTP
- Criar implementação do repositório
- Registrar no módulo

## Pontos que eu revisei e sugestões pendentes

- Adicionei instruções de instalação, variáveis de ambiente e comandos Prisma.
- Sugiro adicionar um `test` script em `package.json` e um pequeno conjunto de testes automatizados.
- Se desejar, eu posso adicionar um arquivo `env.example`, scripts NPM adicionais (ex.: `prisma:generate`, `prisma:migrate`), e testes iniciais para o caso de uso de criação de usuário.

---

Se quiser que eu implemente as sugestões (ex.: `env.example`, script `test`, testes unitários`), diga qual você prefere que eu faça primeiro.
