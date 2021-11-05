const assert = require('assert');
const repository = require('../../src/repository/userRepository');

const constants = require('../utils/constants');

const success = constants.success;
let professorId;
let studentId;
let agentId;

describe('addUser', () => {

  it('should create a user', () => {
    repository.addUser(success.newUserProfessor, success.hash).then((response) => {
      professorId = response;
      assert.equal(typeof (response), 'number');
    });
  });

  it('should create a user', () => {
    repository.addUser(success.newUserStudent, success.hash).then((response) => {
      studentId = response;
      assert.equal(typeof (response), 'number');
    });
  });

  it('should create a user', () => {
    repository.addUser(success.newUserAgent, success.hash).then((response) => {
      agentId = response;
      assert.equal(typeof (response), 'number');
    });
  });

  it('should not create a user', () => {
    repository.addUser({}, success.hash).then((response) => {
      assert.equal(response, 'ERROR');
    });
  });

});


describe('addProfessor()', () => {

  it('should create a professor', () => {
    repository.addProfessor(professorId, success.newUserProfessor).then((response) => {
      assert.equal(typeof (response), 'number');
    });
  });

});

describe('addStudent()', () => {

  it('should create a student', () => {
    repository.addStudent(studentId, success.newUserStudent).then((response) => {
      assert.equal(typeof (response), 'number');
    });
  });

});

describe('addJuridicalAgent()', () => {

  it('should create a juridical agent', () => {
    repository.addJuridicalAgent(agentId, success.newUserAgent).then((response) => {
      assert.equal(typeof (response), 'number');
    });
  });

});
