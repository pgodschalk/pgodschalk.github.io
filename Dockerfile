FROM oven/bun:1.3.5 AS base

WORKDIR /usr/src/app



FROM base AS install

RUN mkdir --parents /temp/prod

COPY package.json bun.lock /temp/prod/

RUN --mount=type=cache,target=/home/bun/.bun/install/cache,id=bun-cache \
  cd /temp/prod && bun install --frozen-lockfile --production



FROM base AS prerelease

ENV ASTRO_TELEMETRY_DISABLED=1

COPY --from=install /temp/prod/node_modules node_modules

COPY . .

ENV NODE_ENV=production

RUN bun run build



FROM nginxinc/nginx-unprivileged:1.29.4-bookworm AS release

COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/dist /usr/share/nginx/html

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080/tcp
