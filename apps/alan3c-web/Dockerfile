# syntax = docker/dockerfile:1

ARG NODE_VERSION=20.18.0

FROM node:${NODE_VERSION}-slim as base

ARG PORT=3000

WORKDIR /src

# Build
FROM base as build

COPY --link package.json package-lock.json .
RUN npm install

COPY --link . .

# 接收 build-time args
ARG NUXT_API_BASE_SSR_URL
# 檢查 ARG 是否被正確傳遞
RUN echo "Build-time ARG NUXT_API_BASE_SSR_URL: ${NUXT_API_BASE_SSR_URL}"
# 將 ARG 設置為 ENV
ENV NUXT_API_BASE_SSR_URL=${NUXT_API_BASE_SSR_URL}
# 檢查 ENV 是否被正確設置
RUN echo "Runtime ENV NUXT_API_BASE_SSR_URL: $NUXT_API_BASE_SSR_URL"


# 接收 build-time args
ARG NUXT_API_BASE_CSR_URL
# 檢查 ARG 是否被正確傳遞
RUN echo "Build-time ARG NUXT_API_BASE_CSR_URL: ${NUXT_API_BASE_CSR_URL}"
# 將 ARG 設置為 ENV
ENV NUXT_API_BASE_CSR_URL=${NUXT_API_BASE_CSR_URL}
# 檢查 ENV 是否被正確設置
RUN echo "Runtime ENV NUXT_API_BASE_CSR_URL: $NUXT_API_BASE_CSR_URL"

RUN npm run build

# Run
FROM base

ENV PORT=$PORT
ENV NODE_ENV=production

COPY --from=build /src/.output /src/.output
# Optional, only needed if you rely on unbundled dependencies
# COPY --from=build /src/node_modules /src/node_modules

CMD [ "node", ".output/server/index.mjs" ]