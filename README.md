# Denyut Posyandu Server

## Overview

Denyut Posyandu server is an express, graphql server providing mainly CRUD services to client side app, such as denyut mobile.

TBD: Mental model image here

## Stack and Notable Packages

- Node (version 20.10 or higher, since it supports env variable without dotenv package)
- pnpm (version 8.13.1 or higher)
- Typescript
- Express
- Apollo (For GraphQL server)
- Supabase

## Set up

1. Make sure [node](https://nodejs.org/en) and [pnpm](https://pnpm.io/installation) is installed with described version
2. run `pnpm install`

## Authentication

- Authentication is handled by supabase
- Each authenticated request will create a supabase client, stored in the `context` of graphql resolvers

## Testing

NOT IMPLEMENTED, WILL USE VITEST

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

1. Development server: `pnpm run start`, uses nodemon to listen to updates
2. Production server: `pnpm run start-prod`, uses tsc to compile and runs compiled code using node
