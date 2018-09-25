# `@usertech/example-client`

Example TODO manager app to serve as a reference for real projects.
One of goals is to implement most of possible features of a typical application
to showcase reusable solutions.

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
- react-final-form
- simple-object-validation
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

Make sure you are using `node@>=8.11.x` and `neutrino@8.x`.

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

### 4. Configure module resolution relative to `src` directory

Add module resolver configuration to neutrino configuration:

    // .neutrinorc.js
    module.exports = {
    	use: [
    		...
    		(neutrino) => neutrino.config.resolve.modules.add(neutrino.options.source),
    		...
    	],
    };

That allows you to refer to your modules by absolute module identifiers making you able to move a module without editing imports.

wrong, you would have to edit this import whenever you move `SomeComponent` somewhere else:

    // src/components/SomeComponent/index.js
    import withMyFeature from '../../decorators/withMyFeature';

right:

    // src/components/SomeComponent/index.js
    import withMyFeature from 'decorators/withMyFeature';

### 5. Set up root component and hot reloading

There is a bug in `@neutrinojs/create-project` which installs incompatible `react-hot-loader` version in a new project.
To fix this, install a compatible version:

    $ yarn add --dev react-hot-loader@3.1.3

Create `App` component to serve as application root.

    // src/App.js
    import React from 'react';

    const App = () => {
    	return <div>App</div>;
    };

    export default App;

Set up `App` component rendering and hot reloading in `src/index.js`.

    // src/index.js
    import React from 'react';
    import { render } from 'react-dom';
    import { AppContainer } from 'react-hot-loader';
    import App from './App';

    const renderApp = (Component) =>
    	render(
    		<AppContainer>
    			<Component />
    		</AppContainer>,
    		document.getElementById('root'),
    	);

    renderApp(App);

    // eslint-disable-next-line no-undef
    if (module.hot) {
    	// eslint-disable-next-line no-undef
    	module.hot.accept('./App', () => {
    		renderApp(App);
    	});
    }

### 6. Set up routing

Use [`react-router`](https://github.com/ReactTraining/react-router)@4 for routing.

Use [`@usertech/react-routing`](https://github.com/usertech/react-routing) to add imperative navigation,
support for (hash)query params and named routes.

See [`src/paths.js`](src/paths.js),
[`src/App.js`](src/App.js)
[`src/screens`](src/screens) and
[`src/screens/DashboardScreen/index.js`](src/screens/DashboardScreen/index.js) for example.

### 7. Set up styling

Use [`styled-components`](https://github.com/styled-components/styled-components)@4 for component visual styling.

Use [`@usertech/styled-utils`](https://github.com/usertech/styled-utils) and refer to it's README for recommended
styled-components helpers.

### 8. Set up data layer with GraphQL and `react-apollo`

Use [`@usertech/neutrino-preset-graphql`](https://github.com/usertech/neutrino-preset-graphql) to add graphql support to your build.

Use [`react-apollo`](https://github.com/apollographql/react-apollo)@2

Use [`@usertech/apollo-client-utils`](https://github.com/usertech/apollo-client-utils)

Use [`react-promise`](https://github.com/capaj/react-promise) to declaratively wait for apollo client instance.

See [`src/App.js`](src/App.js) and [`src/createApolloClient.js`](src/createApolloClient.js)


## Project Structure

// TODO
