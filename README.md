# Orders Online

API NestJS para cadastro de pedidos: tipos de item, itens, pedidos e itens do pedido. Inclui Swagger, migrations TypeORM, seed de demonstração e rate limit.

## Stack

- NestJS 12
- TypeORM + PostgreSQL
- Swagger (`@nestjs/swagger`)
- Rate limit (`@nestjs/throttler`) — 30 requisições por IP a cada 60 segundos
- class-validator / class-transformer
- Node.js 20.19+ ou 22.12+ (recomendado 22+)

## Fluxo de negócio

1. Cadastre **tipos de item** (`type-of-items`) — descrição e percentual de imposto.
2. Cadastre **itens** (`item`) — cada item aponta para um tipo.
3. Crie o **pedido** (`order`) — só número e descrição.
4. Associe **itens ao pedido** (`order-items`) — quantidade; a API calcula `tax_value` e `total_value`.

## Requisitos

- PostgreSQL
- Node.js (versões acima)
- npm

## Configuração

Copie o exemplo de variáveis e ajuste:

```bash
cp .env.example .env
```

| Variável | Descrição |
| --- | --- |
| `DB_HOST` | Host do PostgreSQL |
| `DB_PORT` | Porta do PostgreSQL |
| `DB_USERNAME` | Usuário |
| `DB_PASSWORD` | Senha |
| `DB_DATABASE` | Nome do banco |
| `DATABASE_URL` | Se definida, a conexão usa SSL (não é a string de conexão) |

## Instalação

```bash
npm install
```

## Banco de dados

As migrations **não** rodam ao subir a API. Aplique manualmente:

```bash
npm run migration:show      # pendentes / aplicadas
npm run migration:run       # aplica as pendentes
npm run migration:revert    # desfaz a última
```

Ordem das tabelas: `type_of_items` → `order` → `item` → `order_items` (com FKs e tipos alinhados às entities).

### Dados de demonstração

```bash
npm run seed              # só popula (não limpa)
npm run db:demo-reset     # TRUNCATE + seed (estado demo limpo)
```

O seed cria 2 tipos, 5 itens, 2 pedidos e os itens desses pedidos. Em ambiente de portfólio/demo, agende no servidor apenas:

```bash
npm run db:demo-reset
```

## Executando a API

```bash
npm run start:dev     # desenvolvimento com watch
npm run start         # uma vez
npm run build         # gera dist/
npm run start:prod    # node dist/main
```

A API sobe em `http://localhost:3000`.

### Swagger

Documentação interativa:

- UI: [http://localhost:3000/api](http://localhost:3000/api)
- JSON: [http://localhost:3000/api-json](http://localhost:3000/api-json)

## Endpoints principais

| Recurso | Métodos |
| --- | --- |
| `/` | `GET` — boas-vindas |
| `/type-of-items` | `GET`, `POST`, `GET/:id`, `PATCH/:id`, `DELETE/:id` |
| `/item` | `GET`, `POST`, `GET/:id`, `PATCH/:id`, `DELETE/:id` |
| `/order` | `GET`, `POST`, `GET/:id`, `PATCH/:id`, `DELETE/:id` |
| `/order-items` | `POST`, `GET/:id`, `PATCH/:id`, `DELETE/:id` |
| `/order-items/order/:orderId` | `GET` — itens de um pedido |

Listagens vazias retornam `[]`. Registro inexistente retorna `404`. Número de pedido duplicado retorna `409`. Rate limit excedido retorna `429`.

## Qualidade

```bash
npm run lint
npm test
npm run test:e2e
```

## Comandos úteis

Lista completa em [`comandos_uteis.txt`](comandos_uteis.txt).
