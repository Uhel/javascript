# `@usertech/example-client`

Example app to serve as a reference for real world projects.

- [Development](#development)
- [Architecture](#architecture)
- [Used Libraries](#used-libraries)
    - [Build](#build)
    - [View](#view)
    - [Data Management](#data-management)
- [How to Start a New Project](#how-to-start-a-new-project)
- [Project Structure](#project-structure)

## Development

1. Install dependencies

        $ yarn install --pure-lockfile

2. Start devserver

        $ yarn start

## Architecture

// TODO describe top level arch. view, move Used Libraries to
specific READMEs in project sub-dirs.

## Used Libraries

### Build

- neutrino
- @usertech/neutrino-preset-eslint-prettier

### View

- react
- react-router
- @usertech/react-routing
- styled-components
- styled-map
- styled-is
- styled-prop

### Data Management

- react-apollo

## How to Start a New Project

It's important to be able to create a new project from scratch.
Just copying a boilerplate doesn't ensure proper understanding
of why we do need all those files. Let's describe how this
project was created in an empty directory.

Make sure you are using `node@>=8.11.x`.

### 1. Use `@neutrinojs/create-project` with `yarn` to create a `react` project

When in doubt, refer to [official neutrino docs](https://neutrinojs.org/installation/create-new-project.html).

Pick an url friendly name for your project and refer to
it solely by this name from now on; including repository name,
issue tracker project name etc.
This practice prevents confusion and aids navigation.

    $ yarn create @neutrinojs/project my-project

When asked, pick these options in order:

1. A web or Node.js application
2. React
3. None
4. None

When the process finishes, remove contents of `src` directory
and create `src/index.js` as an entry point of your app.

### 2. Create `.gitignore`

Ignore `node_modules` directory.

    # .gitignore
    node_modules

### 3. Install and configure linting preset

Follow [these instructions](https://github.com/usertech/neutrino-preset-eslint-prettier)
to set up `@usertech/neutrino-preset-eslint-prettier`.

## Project Structure

// TODO
