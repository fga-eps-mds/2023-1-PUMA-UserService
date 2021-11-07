const assert = require('assert');
const bcrypt = require('bcrypt');
const controller = require('../../src/controller/userController');

const constants = require('../utils/constants');

const success = constants.success;
const fail = constants.fail

describe('registerUser', () =>{
  it('should register a user -> professor', (done) => {
      controller.registerUser({
        ...success.newUserProfessor,
        password: 'password',
        type: 'Professor',
        email: 'controller@professor.com',
        matricula: 541
      }).then(() => {
        done();
      }).catch((err) => {
        done(new Error(err));
      });
  });

  it('should register a user -> Juridical Agent', (done) => {
    controller.registerUser({
      ...success.newUserJuridical,
      password: 'password',
      type: 'Agente Externo',
      externalAgentType: 'Pessoa Juridica',
      cnpj: 998728
    }).then(() => {
      done();
    });
  });

  it('should register a user -> physical Agent', (done) => {
    controller.registerUser({
      ...success.newUserPhysical,
      password: 'password',
      type: 'Agente Externo',
      externalAgentType: 'Pessoa Fisica',
      cpf: 998728
    }).then(() => {
      done();
    });
  });

  it('should register a user -> Student', (done) => {
    controller.registerUser({
      ...success.newUserStudent,
      password: 'password',
      type: 'Aluno',
      externalAgentType: 'Pessoa Fisica',
      matricula: 998728
    }).then(() => {
      done();
    });
  });

  it('should not register a user -> null obj', (done) => {
    controller.registerUser({}).then((res)=>{
      done(new Error(res));
    }).catch(() => {
      done();
    });
  });

  it('should not register a user -> unknown external agent type', (done) => {
    controller.registerUser({
      email: 'unknown@external.com',
      name: 'foo',
      password: 'password',
      type: 'Agente Externo',
      externalAgentType: 'unknown'
    }).then((res)=>{
      done(new Error(res));
    }).catch(() => {
      done();
    });
  });

  it('should not register a user -> unknown type', (done) => {
    controller.registerUser({
      email: 'unknown@type.com',
      name: 'foo',
      password: 'password',
      type: 'unknown',
    }).then((res)=>{
      done(new Error(res));
    }).catch(() => {
      done();
    });
  });

});

describe('checkUserAndGetType', () => {

  before((done) => {
    controller.registerUser({
      ...success.newUserStudent,
      email: 'checkuser@student.com',
      password: 'password',
      type: 'Aluno',
      matricula: 55555
    }).then(()=>{
      done();
    })
  });

  it('should return id and type', (done) => {
    controller.checkUserAndGetType({email: 'checkuser@student.com', password: 'password'}).then((res) => {
      assert.equal(typeof (res), 'object');
      done();
    });
  });

});
