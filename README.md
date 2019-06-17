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

### 2.a Installation

#### What we intend to create

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

#### Manually, from what exists

From: https://docs.feathersjs.com/guides/chat/creating.html
 and: https://docs.feathersjs.com/guides/basics/generator.html

Node.js >= 8 is recommended.

This is for the Feathers v4 beta

```
npm r @feathersjs/cli -g
npm i @feathersjs/cli@pre -g
feathers --version
# should be >= 4.x

cd myproject
mkdir src-feathers
cd src-feathers
feathers generate app
# accept defaults, except Jest
npm start
# http://localhost:3030
```

### 2.b Integrate

Glue it all together.



## 3. Add features

As an example, let's add a group todo list?

## 4. Package and deploy

As an example, let's package as docker image

