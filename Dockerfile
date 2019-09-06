# Some ideas taken from https://github.com/BretFisher/node-docker-good-defaults/
# Example run: docker run --rm -it -p 4444:4444 ssoc

FROM node:12.10

# Setup environment
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# default to port 4444
ARG PORT=4444
ENV PORT $PORT
EXPOSE $PORT

# global installs. Including latest npm, for speed and fixes
RUN npm i -g npm@latest

# install dependencies first, in a different location for easier app bind mounting for local development
# due to default /opt permissions we have to create the dir with root and change perms
RUN mkdir /opt/node_app && mkdir /opt/node_app/app
RUN chown node:node /opt/node_app && chown node:node /opt/node_app/app
WORKDIR /opt/node_app

# the official node image provides an unprivileged user as a security best practice
# but we have to manually enable it. We put it here so npm installs dependencies as the same
# user who runs the app. 
# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md#non-root-user
ARG XARDION=2
USER node
COPY package.json ./
RUN npm install
ENV PATH /opt/node_app/node_modules/.bin:$PATH

# copy in our source code last, as it changes the most
WORKDIR /opt/node_app/app
COPY . .
RUN npm run build

# Final build & serve. This feels like a hack but seems to work.
ENTRYPOINT ["sh"]
CMD ["-c", "node ssoc"]