# `src/screens`

Top level route content components.

# Screen Implementation Process

## Phase 1

Create screen component with complete functionality and functionality-essential visual styling

- GraphQL schema validation and adjustment
    - **ex.:** Screen displays data grid of `Item`s but there is no `Item` type in schema so we need to create it.
    - **ex.:** Screen allows for data sorting but there are no sorting related parameters in corresponding Query field so we need to design them and add them to field schema.
    - **ex.:** Screen creates new `Article` but there is not mutation in schema so we need to create it.
- Client state design
    - **ex.:** Most of the client state (e.g. not data fetched from server) should be stored in path or query parameters. This promotes easy linking to all possible states in which a screen can be.
    - path params
        - **ex.:** Changing a path parameter semantically changes route to different resource (`articleId`)
    - query params
        - **ex.:** Changing query parameter changes resource representation (filtering, sorting)
    - hash query params
        - **ex.:** Same semantics as query params but more secure as their values are not sent to server. Used for links with secret tokens.
    - client graphql state
        - **ex.:** User's preferred currency to display prices.
- Queries
    - **ex.:** Asses what data is needed to render screen and assemble query/queries
- Data Formatting
    - **ex.:** Format data and compute derived data for screen from queried data and local state. Avoid visual styling.
    - **ex.:** Format dates to user's locale.
    - **ex.:** Format prices to user's locale.
    - **ex.:** Compute percentage amounts for components showing percentage.
    - **ex.:** Compute ratios of things according to UI design ("3/5 things are complete" where things are from multiple sets)
- Forms
    - **ex.:** Assemble forms and handle form submission
- Mutations
    - **ex.:** Asses what data mutations the screen handles. Design and implement GraphQL mutations.
    - success handling
        - **ex.:** Show success flash message
    - error handling
        - **ex.:** Show form validation errors
        - **ex.:** Show general form error
        - **ex.:** Show error flash message
- Routing/Redirection Logic
    - **ex.:** After successful form submission, there is a redirection to next screen.
- Functionality-Essential Stylesheets
    - **ex.:** If a screen features a datepicker, basic styling of datepicker is functionality-essential because user has to be able to select date. Colors, border styles etc. are not functionality-essential. Goal is to have a datepicker which generally looks like a datepicker.

## Phase 2

- final visual styling of components to pixel-perfect state according to graphic design.
