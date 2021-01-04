FROM node:lts-alpine

# Install eslint globally
# RUN sudo -u ${USERNAME} npm install -g eslint

EXPOSE 4200

RUN n | npm install -g @angular/cli
RUN npm install -g eslint
# RUN  n | npm install innuti ossific-app

RUN mkdir -p /usr/src/workspace
WORKDIR /usr/src/workspace
