import React from 'react';
import { storiesOf } from '@storybook/react';
import TextareaFormControl from 'form-controls/TextareaFormControl';

storiesOf('TextareaFormControl', module).add('default', () => (
	<div>
		<TextareaFormControl
			defaultValue={`Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Nulla vitae elit libero, a pharetra augue. Maecenas faucibus mollis interdum. Nullam quis risus eget urna mollis ornare vel eu leo.
Donec id elit non mi porta gravida at eget metus. Donec ullamcorper nulla non metus auctor fringilla. Cras mattis consectetur purus sit amet fermentum. Curabitur blandit tempus porttitor. Cras mattis consectetur purus sit amet fermentum.
Maecenas faucibus mollis interdum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Maecenas sed diam eget risus varius blandit sit amet non magna. Sed posuere consectetur est at lobortis.
Cras justo odio, dapibus ac facilisis in, egestas eget quam. Nullam id dolor id nibh ultricies vehicula ut id elit. Maecenas faucibus mollis interdum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`}
		/>
	</div>
));
