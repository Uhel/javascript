# src

Entire source code of an app.

## src/index.js

Entry point of an application.
Bootstraps application and renders Application root component into DOM element with id `root`.

## src/App.js

Application root component.

## src/paths.js

Module containing constants of application routes paths.

## schema.graphql

Application graphql schema. Describes data model of client - server communication.

## createApolloClient.js

For GraphQL api communication we use react-apollo.
This module exports async function to create specific apollo client for our application.
This includes data mocking setup to quickstart development.
