# Quasar/Feathers integration example

This is an example and stepthrough of a Quasar (1.0) / Feathers (4.0) integration.

The idea is to create the packages, documentation, and community on using these two great projects together.

Quasar and Vue use Vuex for state, so we use FeathersVuex to put data into the Vuex store.  FeathersVuex also puts the current user data in the store, so we are authenticating with FeathersVuex.

These 3 commands start the project:

```
./mongoStart.sh
./quasarStart.sh
./src-feathers/feathersStart.sh
```

And `./src-feathers/build.sh` should make a Docker image if you have the tooling installed (and probably Linux)

That makes an end-to-end developer story for Quasar + Feathers which is great!  

You can see the difference between Quasar/Feathers base installs and the glue code with: 

```
git difftool -d master..2956b9e98da5a90c169133d64d6dc21f1c88c3e3
```
