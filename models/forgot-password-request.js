const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const forgotPasswordRequestSchema = new Schema({
  uuid: {
    type: String,
    unique: true
  },
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
