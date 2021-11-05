const assert = require('assert');
const repository = require('../../src/repository/userRepository');
// const app = require('../../src/index')

let userId;
const newUser = {
  name: 'foo',
  email: 'foo@bar.com',
};

describe('addUser', () => {

  const hash = 'ilawefybabgveouyvbfev';

  const newUserFail = {}

  it('should create a user', () => {
    repository.addUser(newUser,hash).then((response) => {
      userId = response;
      assert.equal(typeof (response), 'number');
    });
  });

  it('should not create a user', () => {
    repository.addUser(newUserFail, hash).then((response) => {
      assert.equal(response, 'ERROR');
    });
  });

});


describe('addProfessor()', () => {

  it('should create a professor', () => {
    repository.addProfessor(userId, newUser).then((response) => {
      assert.equal(typeof (response), 'number');
    });
  });

});
