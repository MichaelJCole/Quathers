# Quasar/Feathers integration example

This is an example and stepthrough of a Quasar (1.0) / Feathers (4.0) integration.

The idea is to create the packages, documentation, and community on using these two great projects together.

The Developer Story starts here:

## 1. Install Quasar

From: https://quasar.dev/quasar-cli/installation

Node.js >= 8.9.0 is required.

```
node --version
npm uninstall -g quasar-cli
npm install -g @quasar/cli
quasar create myproject
# Include vuex and all defaults
cd myproject
quasar dev
```

## 2. Add Quasar Feathers App Extension


### Intent to Create

From: https://github.com/quasarframework/app-extension-feathersjs

```
cd myproject
quasar ext add @quasar/feathersjs
```

Adds 
- feathersClient (required)
  - Choose: (socket.io or primus) and/or rest 
- feathersVuex (optional?) 
- feathersAccounts (optional)
- proxyAPIserver webpack config (optional)

### From what exists

From: https://docs.feathersjs.com/guides/chat/creating.html
 and: https://docs.feathersjs.com/guides/basics/generator.html

Node.js >= 8 is recommended.

```
npm install @feathersjs/cli -g
feathers --version
# should be 3.8.2 or greater

cd myproject
mkdir src-feathers
cd src-feathers
feathers generate app
npm start
# http://localhost:3030
```

## 3. Add features

As an example, let's add a group todo list?

## 4. Package and deploy

As an example, let's package as docker image

