#!/bin/bash

# Use node version in .nvmrc if present.
[ -s "$HOME/.nvm/nvm.sh" ] && source "$HOME/.nvm/nvm.sh" && nvm install

# Install packages using Facebook's Yarn
[ ! -d "node_modules" ] && yarn

# Install quasar globally if not present
npm list -g @quasar/cli || npm install -g @quasar/cli  

# Start dev server
quasar dev
