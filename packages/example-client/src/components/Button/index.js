import styled from 'styled-components';
import compose from '@brabeji/styled-compose';
import Reset from 'primitives/Reset';
import Clickable from 'primitives/Clickable';
import Rounding from 'primitives/Rounding';
import ButtonColors from 'primitives/ButtonColors';
import ButtonSize from 'primitives/ButtonSize';

const Uppercase = styled.div`
	text-transform: uppercase;
`;

const Button = compose(
	'button',
	Reset,
	Clickable,
	Rounding,
	ButtonColors,
	ButtonSize,
	Uppercase,
);

export default Button;
