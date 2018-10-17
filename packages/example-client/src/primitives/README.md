# `src/primitives`

Here are styled components **rendering a single styled dom element** to be reused as visual primitives.

These can be extended:

Basic example:

```javascript
const Foo = styled.div`
    color: blue;
`
const Bar = styled(Foo)`
    color: red;
`
```

Multiple primitives example:

```javascript
import compose from '@brabeji/styled-compose';
const Foo = styled.div`
    color: blue;
`
const Bar = styled.div`
    color: red;
`

const Button = compose('button', Foo, Bar);

// is equivalent to
const Button = styled(
    styled('button')`
        color: blue;
    `
)`
    color: red;
`;

```
