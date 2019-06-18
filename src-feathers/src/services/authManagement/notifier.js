module.exports = function(app) {
  function getLink(type, hash) {
    return `${app.get('redirect')}/${type}?token=${hash}`;
  }

  function sendEmail(email) {
    return app
      .service('mailer')
      .create(email)
      .catch(err => {
        console.log('EMAIL TRANSPORT ERROR:', err);
      });
  }

  return function(type, user, notifierOptions) {
    let tokenLink, email;

    switch (type) {
    case 'verifySignup':
    case 'resendVerifySignup': //sending the user the verification email
      tokenLink = getLink('verify-email', user.verifyToken);
      email = {
        to: user.email,
        subject: 'Verify Signup',
        html: `
              <p>Hi there!</p>
              <p><a href="${tokenLink}">Verify your email here</a></p>`
      };
      return sendEmail(email);

    case 'sendResetPwd':
      tokenLink = getLink('reset-password', user.resetToken);
      email = {
        to: user.email,
        subject: 'Reset Password',
        html: `
              <p>Hi there!</p>
              <p><a href="${tokenLink}">Reset your password here</a></p>`
      };
      return sendEmail(email);

    case 'resetPwd':
      email = {
        to: user.email,
        subject: 'Your password was reset.',
        html: `
              <p>Hi there!</p>
              <p>Your password was reset.</p>`
      };
      return sendEmail(email);

    case 'passwordChange':
      email = {
        to: user.email,
        subject: 'Password Change',
        html: `
              <p>Hi there!</p>
              <p>Your password was changed.</p>`
      };
      return sendEmail(email);

    case 'identityChange':
      email = {
        to: user.email,
        subject: 'Email Changed',
        html: `
              <p>Hi there!</p>
              <p>Your email address was changed.</p>`
      };
      return sendEmail(email);

    default:
      throw 'ERROR: unknown Notifier type: ' + type;
    }
  };
};
