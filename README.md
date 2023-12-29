# Denyut Posyandu Server

## Overview

Denyut Posyandu server is an express, graphql server providing mainly CRUD services to client side app, such as denyut mobile.

TBD: Mental model image here

## Stack and Notable Packages

- Typescript
- Express
- Apollo (For GraphQL server)
- Supabase

## Authentication

- Authentication is handled by supabase
- Each authenticated request will create a supabase client, stored in the `context` of graphql resolvers

## CI / CD

### Compilation check

Compilation check uses typescript `tsc --noEmit`

To check, execute `npm run ts:check`

### Linting

Linting uses eslint with [expo configuration](https://github.com/expo/expo/tree/main/packages/eslint-config-universe#customizing-prettier) as base, then customization are added, check `.eslintrc.json`.

To check, execute `npm run lint`

### Formatting

Uses [prettier](https://prettier.io/), config is available in `.prettierrc`

To format, execute `npm run format`

TBD: Workflow checks for PR are not in place yet. Until then, make sure before each PR, `npm run check` is executed without issues.

## Starting Server

1. Development server: `pnpm run start`, uses nodemon to listent to updates
2. Production server: `pnpm run start-prod`, uses ts-node
