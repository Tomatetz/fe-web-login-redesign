FROM node:13.3.0 as builder

WORKDIR /fe-web-login

ADD *.json ./
ADD yarn.lock ./

ARG NPM_TOKEN=
RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" >> ~/.npmrc
RUN yarn

ADD *.js ./
ADD .prettierrc ./
ADD server server
ADD src src
ADD public public

ARG NAMESPACE=
ENV NAMESPACE=$NAMESPACE

RUN yarn build:prod

ENTRYPOINT ["yarn"]


# Server
FROM node:11.10.0-alpine as server

COPY --from=builder /fe-web-login/build /fe-web-login/build
COPY --from=builder /fe-web-login/server /fe-web-login/server
WORKDIR /fe-web-login/server

RUN yarn

EXPOSE 8080

ENTRYPOINT ["yarn", "start"]
