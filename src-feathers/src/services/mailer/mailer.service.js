// Initializes the `sendmail` service on path `/sendmail`
const feathersMailer = require('feathers-mailer');
const sparkPost = require('nodemailer-sparkpost-transport');
const nodemailer = require('nodemailer');

const hooks = require('./mailer.hooks');

// const configDefault = 'smtp://user:pass@smtp.host.com/?secure=false&requireTLS=true';

module.exports = function(app) {
  // Get a transport depending on config. 
  // Default is print to concole:  https://nodemailer.com/plugins/create/#transports
  let transport = {
    name: 'minimal',
    version: '0.1.0',
    send: (mail, callback) => {
      process.stdout.write(`\n===== to: ${mail.message.getAddresses().to[0].address} =====\n`);
      let input = mail.message.createReadStream();
      input.pipe(process.stdout);
      input.on('end', function () {
        callback(null, true);
      });
    }
  };

  if (app.get('sparkPostApiKey'))
    transport = sparkPost({ sparkPostApiKey: app.get('sparkPostApiKey') });

  const mailer = feathersMailer(transport, { from: app.get('fromEmail') });

  // Configure the transport in our app
  app.use('/mailer', mailer); // this is an internal only API.

  const service = app.service('mailer');
  service.hooks(hooks); // disallow
};
