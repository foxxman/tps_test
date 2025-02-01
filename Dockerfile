ARG RUN_IMAGE=node:22.6-alpine3.20
FROM node:22.6-alpine3.20 as prepare_deps

WORKDIR /home/web/code/
COPY ./yarn.lock ./yarn.lock
COPY ./package.json ./package.json
COPY ./services/backend/package.json ./services/backend/package.json
RUN yarn install --network-timeout=300000

# LOCAL IMAGE
FROM $RUN_IMAGE as run_local
ARG SERVICE_DIR
COPY --from=prepare_deps /home/web/code /home/web/code
WORKDIR /home/web/code/services/${SERVICE_DIR}
ENTRYPOINT ["yarn", "start:dev"]
