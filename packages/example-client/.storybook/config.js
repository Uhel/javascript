import { configure, addDecorator } from '@storybook/react';
import Wrapper from '../stories/Wrapper';

addDecorator(Wrapper);

const req = require.context('../stories', true, /\.js$/);
function loadStories() {
	req.keys().forEach(req);
}

configure(loadStories, module);
