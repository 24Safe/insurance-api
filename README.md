  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

A reference implementation for insurance companies to expose standardized APIs enabling seamless integration with the 24 Safe platform for coverage validation, service authorization, and pricing.

## Installation

```bash
$ npm install
$ cp .env .env.example
$ npx prisma migrate dev
$ ts-node prisma/seed.ts
```

Note:

API_KEY is arbitrary string that this API uses to validate incoming request.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Docs

Checkout `http://localhost:3000/docs#/` for Swagger Documentation
