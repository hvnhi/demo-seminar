# Dockerfile
FROM node:18-alpine

ENV APP_ROOT /var/jenkins_home/workspace/develop
# create destination directory
RUN mkdir -p ${APP_ROOT}
WORKDIR ${APP_ROOT}

COPY package.json ./

RUN yarn install

COPY . .


EXPOSE 5000
CMD [ "node", "index.js" ]