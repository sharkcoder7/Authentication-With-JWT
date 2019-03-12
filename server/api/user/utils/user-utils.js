import jwt from 'jsonwebtoken';
import _ from 'lodash';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import logger from '../../../config/logger';

const ENV = process.env.NODE_ENV || 'development';
const config = require('../../../../env.json')[ENV];

const generateAuthToken = (user) => {
  const token = jwt.sign({
    _id: user._id.toHexString(),
    access: config.TOKENS.access,
  }, config.SECRET).toString();

  user.tokens.push({ access: config.TOKENS.access, token });
  return user.save().then(() => token);
};

const trimUserResponse = (user) => {
  const userObject = user.toObject();
  return _.pick(userObject, ['_id', 'email']);
};

const findByToken = (token) => {
  let decoded;
  try {
    decoded = jwt.verify(token, config.SECRET);
    return User.findOne({
      _id: decoded._id,
      'tokens.token': token,
      'tokens.access': config.TOKENS.access,
    });
  } catch (e) {
    return Promise.reject(e);
  }
};

const hashPassword = function(next) {
  const user = this;
  // Only do something if password has been modified
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (genSaltErr, salt) => {
      if (genSaltErr) {
        return logger.error(genSaltErr);
      }
      return bcrypt.hash(user.password, salt, (hashErr, hash) => {
        if (hashErr) {
          return logger.error(hashErr);
        }
        user.password = hash;
        return next();
      });
    });
  } else {
    next();
  }
};

export {
  generateAuthToken,
  trimUserResponse,
  findByToken,
  hashPassword,
};
