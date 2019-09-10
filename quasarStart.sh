#!/bin/bash

# Use node version in .nvmrc if present.
[ -s "$HOME/.nvm/nvm.sh" ] && source "$HOME/.nvm/nvm.sh" && nvm install

# Install quasar and Facebook's Yarn globally if not present.  If it doesn't work, just run the 2nd command.
npm list -g @quasar/cli || npm install -g @quasar/cli yarn

# Install packages using Facebook's Yarn
[ ! -d "node_modules" ] && yarn

# Start dev server
quasar dev
