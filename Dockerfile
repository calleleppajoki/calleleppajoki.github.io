FROM node:lts-alpine

# Install eslint globally
# RUN sudo -u ${USERNAME} npm install -g eslint

EXPOSE 4200

RUN npm install -g @angular/cli
RUN npm install -g eslint
# RUN  n | npm install innuti ossific-app

RUN mkdir -p /usr/src/workspace
VOLUME /usr/src/workspace
WORKDIR /usr/src/workspace

# Not exactly sure this is needed, but I'm not gonna touch it if it works.
CMD ["tail", "-f", "/dev/null"]