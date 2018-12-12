#!/usr/bin/env bash

export NODE_PATH=`yarn global dir`/node_modules

./wait-for-it.sh ${PRISMA_API_HOST}

pm2-runtime start ecosystem.config.js
