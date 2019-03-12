import mongoose from 'mongoose';
import validator from 'validator';

import {
  generateAuthToken,
  trimUserResponse,
  findByToken,
  hashPassword,
  findByCredentials,
  removeToken,
} from './../utils/user-utils';

const userDocument = {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: value => validator.isEmail(value),
      message: '{VALUE} is not a valid Email',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  tokens: [{
    access: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  }],
};

const UserSchema = new mongoose.Schema(userDocument);

UserSchema.pre('save', hashPassword);
UserSchema.methods.trimUserResponse = trimUserResponse;
UserSchema.methods.generateAuthToken = generateAuthToken;
UserSchema.methods.removeToken = removeToken;
UserSchema.statics.findByToken = findByToken;
UserSchema.statics.findByCredentials = findByCredentials;

const User = mongoose.model('User', UserSchema);

export default User;
