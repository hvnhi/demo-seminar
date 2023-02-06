# Dockerfile
FROM node:18-alpine

ENV APP_ROOT /var/jenkins_home/workspace/develop
# create destination directory
RUN mkdir -p ${APP_ROOT}
WORKDIR ${APP_ROOT}

#COPY . ${APP_ROOT}

RUN yarn install

COPY ./ ${APP_ROOT}


EXPOSE 3000
CMD [ "node", "index.js" ]