import { shield, allow } from 'graphql-shield';

export default shield(
	{},
	{
		fallbackRule: allow,
	},
);
