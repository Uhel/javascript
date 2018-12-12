import { prisma } from './generated/prisma-client';
import { GraphQLServer } from 'graphql-yoga';
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';
import { AuthenticationClient } from 'auth0';
import getNamespacedClaim from './tools/getNamespacedClaim';
import debug from 'debug';
import { parse, isAfter } from 'date-fns';
import { Request } from 'express';
import resolvers from './resolvers';
import permissionsMiddleware from './permissions';

const authDebug = debug('uplus-example-app:auth');

const auth0 = new AuthenticationClient({
	clientID: process.env.AUTH_CLIENT_ID,
	domain: process.env.AUTH_DOMAIN,
	audience: process.env.AUTH_AUDIENCE,
});

// prisma.debug = true;

export interface AuthenticatedRequest extends Request {
	user?: any;
	authToken?: any;
	dbUser?: any;
}

const server = new GraphQLServer({
	typeDefs: './schema.graphql',
	resolvers,
	context: ({
		request: { dbUser, authToken },
		request,
		...ctx
	}: {
		request: AuthenticatedRequest;
	}) => {
		return {
			...ctx,
			request,
			prisma,
			auth0,
			dbUser,
			authToken,
		};
	},
	middlewares: [permissionsMiddleware],
});

server.express.use(
	jwt({
		secret: jwks.expressJwtSecret({
			cache: false,
			rateLimit: false,
			jwksRequestsPerMinute: 5,
			jwksUri: process.env.AUTH_JWKS_URL,
		}),
		audience: process.env.AUTH_AUDIENCE,
		issuer: `https://${process.env.AUTH_DOMAIN}/`,
		algorithms: ['RS256'],
		credentialsRequired: false,
	}),
	async (req: AuthenticatedRequest, res, next) => {

		console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>', req.user);

		req.authToken = req.user;
		if (req.user) {
			authDebug('Request has token');

			const sub = req.user.sub;
			let dbUser = await prisma.user({ sub });
			// authDebug('Corresponding exsiting dbUser', dbUser);

			if (!dbUser) {
				authDebug('Call Auth0 userinfo endpoint - pre request');
				const authUser = await auth0.users.getInfo(req.headers.authorization.split(' ').pop());
				// authDebug('Retrieved authUser', authUser);
				const { email, picture } = authUser;

				let dbUserByEmail = await prisma.user({ email });
				if (dbUserByEmail) {
					dbUser = await prisma.updateUser({
						where: { email },
						data: {
							sub,
							email,
							picture,
							fullName: getNamespacedClaim(authUser, 'fullName'),
						},
					});
				} else {
					dbUser = await prisma.createUser({
						sub,
						email,
						picture,
						fullName: getNamespacedClaim(authUser, 'fullName'),
					});
				}
			}

			let authToken = req.authToken;
			if (isAfter(parse(authToken.iat * 1000), parse(dbUser.lastLoginAt || 0))) {
				authDebug('Call Auth0 userinfo endpoint - currentUser');
				const authUser = await auth0.users.getInfo(req.headers.authorization.split(' ').pop());
				dbUser = await prisma.updateUser({
					where: { sub: dbUser.sub },
					data: {
						fullName: getNamespacedClaim(authUser, 'fullName') || null,
						lastLoginAt: parse(authToken.iat * 1000),
					},
				});
			}

			req.dbUser = dbUser;
		}
		next();
	},
);

server.start({}, () => console.log('Server is running on http://localhost:4000'));
