// https://crow.docs.feathersjs.com/api/authentication/client.html#configuration

// Feathers client
const feathers = require('@feathersjs/feathers')
// REST transport
const restClient = require('@feathersjs/rest-client')
const axios = require('axios')
// Socket.io transport
// const socketio = require('@feathersjs/socketio-client')
// const io = require('socket.io-client')
// Auth library
const auth = require('@feathersjs/authentication-client')
import { CookieStorage } from 'cookie-storage'

// Our App

const apiUrl = 'http://localhost:3030'
const app = feathers()

// Setup the transport (Rest, Socket, etc.) here
app.configure(restClient(apiUrl).axios(axios))
// app.configure(socketio(io(apiUrl)))  // Only one default client can be configured?

// Available options are listed in the "Options" section
const storage = new CookieStorage()
app.configure(auth({ storage }))

export default app
