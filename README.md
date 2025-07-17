## API-BOOKS

API de libros con nest js v11.0.7 y type orm

## Pre requisitos

Tener la bd creada con segun el repositorio: https://github.com/ignaciochavez/sql-books/tree/develop

## Variables de ambientes de proyecto

Estas variables de ambientes deben ser configuradas en un archivo .env o en un docker file

```
NODE_ENV=development
PORT=10001
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=YV4McUIXQW3RqGQr1hW1zOQU1Z8X6t2R
DB_NAME=books
JWT_SECRET=c6a39a9c-7110-41f9-b1a1-08950fc9c77a
JWT_EXPIRATION_TIME=8h
```

## Compilar y ejecutar proyecto

```bash
# development
$ nest start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

## Stay in touch

- Author - [ignacio chavez](https://github.com/ignaciochavez)
