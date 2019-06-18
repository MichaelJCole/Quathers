# This should match package.json and .nvmrc
FROM node:10

# Configure image
ENV NPM_CONFIG_LOGLEVEL info
ENV PORT 80

# Create our working directory
ENV HOME=/usr/src/app
RUN mkdir -p $HOME
WORKDIR $HOME

# Install packages (cached in layer)
COPY package.json package-lock.json ./
RUN npm install --quiet --no-progress

# Bundle app source (cached in layer)
COPY . .

# Expose the port
EXPOSE 80

# Start here
ENTRYPOINT npm start