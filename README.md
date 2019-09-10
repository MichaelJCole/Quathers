# Quasar/Feathers integration example

![Quasar](https://cdn.quasar.dev/logo/svg/quasar-logo.svg =200x)
![Feathers](https://feathersjs.com/img/feathers-logo-wide.png =200x)

Hello, this is an experiment / starter project integrating [Quasar](https://quasar.dev/) and [Feathers](https://feathersjs.com/) with a simple authentication system.

Quasar uses [Vue](https://vuejs.org/) which in turn uses [Vuex](https://vuex.vuejs.org/) for state.

[FeathersVuex](https://feathers-vuex.feathers-plus.com/) exposes FeathersJS services as Vuex plugin to extend the data store.  FeathersVuex has an authentication wrapper which convienently loads the current user's data in the store.  I think the Feathers team may have lost interest/momentum in maintaining FeathersVuex.  There's a 2.0pre, but it's not documented (yet?) and the 1.x versions have (had?) some package compatibility issues.  C'est la open source.

The Quasar team picked up the idea for a [Quasar app extension](https://github.com/quasarframework/app-extension-feathersjs).

For my part in this experiment, I created the integration code and authentication forms as an experiment in learning both frameworks and fostering open source.


## Screenshot

![Screenshot](screenshot.png =900x)


## Run Locally

The development environment runs three processes:  
- MongoDB: `mongod --dbpath="etc/db"`
- Feathers: `nodemon src-feathers/src`
- Quasar: `quasar dev`

These scripts attempt to automate that for Linux:

```
./mongoStart.sh
./src-feathers/feathersStart.sh
./quasarStart.sh
```

## Dockerize

To package and deploy the server, I created a [Docker image](https://github.com/MichaelJCole/Quathers/blob/master/src-feathers/Dockerfile) and [scripting](https://github.com/MichaelJCole/Quathers/blob/master/src-feathers/build.sh) to package Quasar and Feathers into a single process.

You need the proper tooling installed (and probably Linux)

## El Fin!

This project was a great experience learning and integrating these technologies and working to create collaboration in open source.

That makes an end-to-end developer story for Quasar + Feathers which is an exciting start!
