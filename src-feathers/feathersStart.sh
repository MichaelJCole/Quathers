#!/bin/bash

# Use node version in .nvmrc if present.
[ -s "$HOME/.nvm/nvm.sh" ] && source "$HOME/.nvm/nvm.sh" && nvm install

# Install packages
[ ! -d "node_modules" ] && npm install

# See package.json
npm run dev