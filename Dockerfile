FROM docker
COPY --from=docker/buildx-bin /buildx /usr/libexec/docker/cli-plugins/docker-buildx
RUN docker buildx version

# Dockerfile
FROM node:18-alpine

ENV APP_ROOT /var/jenkins_home/workspace/develop
# create destination directory
RUN mkdir -p ${APP_ROOT}
WORKDIR ${APP_ROOT}

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000
CMD [ "node", "index.js" ]
