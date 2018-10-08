FROM keymetrics/pm2:8-alpine

WORKDIR /opt/app

RUN apk add --no-cache bash
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh wait-for-it.sh
RUN chmod +x wait-for-it.sh
RUN yarn global add prisma

COPY package.json .
COPY yarn.lock .
#RUN yarn install --pure-lockfile

COPY src src
COPY prisma.yml .
COPY datamodel.prisma .
COPY ecosystem.config.js .
COPY start.sh .

CMD ["./start.sh"]

# Bundle APP files
#COPY package.json .
#COPY yarn.lock .

# Install app dependencies
#ENV NPM_CONFIG_LOGLEVEL warn
#RUN yarn install --pure-lockfile

#COPY src src/
#COPY ecosystem.config.js .
#COPY prisma.yml .
#COPY datamodel.prisma .

# Expose the listening port of your app
#EXPOSE 8000

#RUN

#CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]
