// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const users = new mongooseClient.Schema({
  
    email: {type: String, unique: true, lowercase: true},
    password: { type: String },
  
    // Added by feathers generate authentication 
    githubId: { type: String },

    // For feathers-authentication-management QUATHERS
    isVerified: { type: Boolean },
    verifyToken: { type: String },
    verifyExpires: { type: Date },
    verifyChanges: { type: Object },
    resetToken: { type: String },
    resetExpires: { type: Date }
  
  }, {
    timestamps: true
  });

  return mongooseClient.model('users', users);
};
