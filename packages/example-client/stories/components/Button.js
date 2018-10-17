import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from 'components/Button';

storiesOf('Button', module).add('variants', () => (
	<div>
		<div>
			<Button>Hello Button</Button>
		</div>
		<div>
			<Button primary>Hello Button</Button>
		</div>
		<div>
			<Button danger>Hello Button</Button>
		</div>
		<div>
			<Button success>Hello Button</Button>
		</div>
		<div>
			<Button small>Hello Button</Button>
		</div>
		<div>
			<Button primary small>
				Hello Button
			</Button>
		</div>
		<div>
			<Button danger small>
				Hello Button
			</Button>
		</div>
		<div>
			<Button success small>
				Hello Button
			</Button>
		</div>
		<div>
			<Button inverse>Hello Button</Button>
		</div>
		<div>
			<Button primary inverse>
				Hello Button
			</Button>
		</div>
		<div>
			<Button danger inverse>
				Hello Button
			</Button>
		</div>
		<div>
			<Button success inverse>
				Hello Button
			</Button>
		</div>
		<div>
			<Button small inverse>
				Hello Button
			</Button>
		</div>
		<div>
			<Button primary small inverse>
				Hello Button
			</Button>
		</div>
		<div>
			<Button danger small inverse>
				Hello Button
			</Button>
		</div>
		<div>
			<Button success small inverse>
				Hello Button
			</Button>
		</div>
	</div>
));
