FROM keymetrics/pm2:8-alpine

WORKDIR /opt/app

RUN apk add --no-cache bash
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh wait-for-it.sh
RUN chmod +x wait-for-it.sh
RUN yarn global add esm

COPY ./package.json /opt/app/package.json
COPY ./yarn.lock /opt/app/yarn.lock
RUN yarn install --pure-lockfile
RUN pm2 install typescript

COPY ./bin /opt/app/bin
COPY ./seed-data /opt/app/seed-data
COPY ./src /opt/app/src
COPY ./tsconfig.json /opt/app/tsconfig.json
COPY ./datamodel.prisma /opt/app/datamodel.prisma
COPY ./schema.graphql /opt/app/schema.graphql
COPY prisma.yml ecosystem.config.js start.sh /opt/app/

CMD ["./start.sh"]
