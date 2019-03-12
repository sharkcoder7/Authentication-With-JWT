import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import User from '../../api/user/models/User';

const ENV = process.env.NODE_ENV || 'development';
const config = require('../../../env.json')[ENV];

const userOneId = new ObjectId();
const userTwoId = new ObjectId();
const userThreeId = new ObjectId();
const userFourId = new ObjectId();
const users = [{
  _id: userOneId,
  email: 'aphrodite@test.com',
  password: 'userOnePass',
  tokens: [{
    access: config.TOKENS.access,
    token: jwt.sign({ _id: userOneId, access: config.TOKENS.access }, config.SECRET).toString(),
  }],
}, {
  _id: userTwoId,
  email: 'aphrodite2@test.com',
  password: 'userTwoPass',
  tokens: [{
    access: 'wrong-access',
    token: jwt.sign({ _id: userTwoId, access: config.TOKENS.access }, config.SECRET).toString(),
  }],
}, {
  _id: userThreeId,
  email: 'aphrodite3@test.com',
  password: 'userThreePass',
  tokens: [{
    access: config.TOKENS.access,
    token: 'wrongToken',
  }],
}, {
  _id: userFourId,
  email: 'aphrodite4@test.com',
  password: 'userFourPass',
  tokens: [{
    access: '',
    token: '',
  }],
}];

const populateUsers = (done) => {
  User.remove({}).then(() => {
    const userOne = new User(users[0]).save();
    const userTwo = new User(users[1]).save();
    const userThree = new User(users[2]).save();

    return Promise.all([userOne, userTwo, userThree]);
  }).then(() => done());
};

export { populateUsers, users };

