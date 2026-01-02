FROM dhi.io/bun:1.3-dev AS base

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



FROM dhi.io/nginx:1.29 AS release

COPY --chown=nginx:nginx nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --chown=nginx:nginx --from=prerelease /usr/src/app/dist /usr/share/nginx/html

EXPOSE 8080/tcp
