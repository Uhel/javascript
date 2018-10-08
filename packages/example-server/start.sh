#!/usr/bin/env bash

./wait-for-it.sh db-api:4466
prisma deploy --force
prisma generate
pm2-runtime start ecosystem.config.js
