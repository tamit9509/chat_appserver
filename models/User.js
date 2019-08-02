'use strict'

const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let userSchema = new Schema({
  name: {
    type: String,
    default: ''
  },
  status: {
    type: Boolean,
    default: false
  },
  email: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: ''
  },
  emailVarified: {
    type: String,
    default: 'No'
  },
  createOn: {
    type: Date,
    default: ''
  }
});

mongoose.model('User', userSchema);
