import jwt from 'jsonwebtoken';
import _ from 'lodash';

const ENV = process.env.NODE_ENV || 'development';
const config = require('../../../../env.json')[ENV];

const generateAuthToken = (user) => {
  const access = 'auth';
  const token = jwt.sign({
    _id: user._id.toHexString(),
    access,
  }, config.SECRET).toString();

  user.tokens.push({ access, token });
  return user.save().then(() => token);
};

const trimUserResponse = (user) => {
  const userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

export { generateAuthToken, trimUserResponse };
