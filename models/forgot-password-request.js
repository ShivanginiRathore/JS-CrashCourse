const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const forgotPasswordRequestSchema = new Schema({
  isActive: {
    type: Boolean
  },
  userId:{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
  
});

module.exports = mongoose.model('forgotPasswordRequest', forgotPasswordRequestSchema);
