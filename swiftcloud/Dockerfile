FROM node:20-slim as installer

WORKDIR /app

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json

RUN npm ci

FROM node:20-slim as builder

WORKDIR /app

COPY --from=installer /app/node_modules /app/node_modules
COPY --from=installer /app/package.json /app/package.json
COPY --from=installer /app/package-lock.json /app/package-lock.json

COPY ./.eslintrc.js /app/.eslintrc.js
COPY ./.prettierrc /app/.prettierrc
COPY ./nest-cli.json /app/nest-cli.json
COPY ./src /app/src
COPY ./tsconfig.build.json /app/tsconfig.build.json
COPY ./tsconfig.json /app/tsconfig.json
COPY ./assets /app/assets

RUN npm run build

FROM node:20-slim

ENV PORT=4000
ENV HOST=0.0.0.0

WORKDIR /app

COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/build /app/build
COPY --from=builder /app/assets /app/assets
COPY --from=builder /app/package.json /app/package.json

EXPOSE 4000

CMD [ "npm", "run", "start:prod" ]