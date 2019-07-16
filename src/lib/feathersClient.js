// Note that we use feathers-vuex for auth.  See store/index.js

// Feathers client
const feathers = require('@feathersjs/feathers')

// REST transport
const restClient = require('@feathersjs/rest-client')
const axios = require('axios')

// Auth library
const auth = require('@feathersjs/authentication-client')

// Our App
const apiUrl = process.env.API_URL || 'http://localhost:3030'
const app = feathers()

// Setup the transport (Rest, Socket, etc.) here
app.configure(restClient(apiUrl).axios(axios))

// Available options are listed in the "Options" section
app.configure(auth({ storageKey: 'feathers-jwt', storage: window.localStorage }))

// Export the app
export default app

// Alternate Socket.io transport
// const socketio = require('@feathersjs/socketio-client')
// const io = require('socket.io-client')
// app.configure(socketio(io(apiUrl)))  // Only one default client can be configured?
