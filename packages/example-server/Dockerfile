FROM brabeji/prisma-app

COPY ./package.json /opt/app/package.json
COPY ./yarn.lock /opt/app/yarn.lock
RUN yarn install --pure-lockfile

COPY ./src /opt/app/src
COPY ./datamodel.prisma /opt/app/datamodel.prisma
COPY ./schema.graphql /opt/app/schema.graphql
