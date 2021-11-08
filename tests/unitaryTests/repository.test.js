const assert = require('assert');
const bcrypt = require('bcrypt');
const repository = require('../../src/repository/userRepository');

const constants = require('../utils/constants');

const success = constants.success;
const fail = constants.fail

describe('addUser', () => {

  it('should create a user -> Professor', (done) => {
    repository.addUser(success.newUserProfessor, success.hash).then((response) => {
      assert.equal(typeof (response), 'number');
      done();
    }).catch((error) => {
      console.log(error);
      done(new Error(error))
    });

  });

  it('should not create a user', (done) => {
    repository.addUser({}, success.hash).then((response) => {
      done(new Error(response))
    }).catch((error) => {
      console.log(error);
      assert.equal(error, 'ERROR');
      done();
    });
  });

});


describe('add user type()', () => {
  let id = 0;
  beforeEach((done) => {
    const newUser = {name: `asd${id}`, email: `asd${id}@email.com`}
    repository.addUser(newUser, success.hash).then((response) => {
      id = response;
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should create a professor', (done) => {
    repository.addProfessor(id, success.newUserProfessor).then((response) => {
      assert.equal(typeof (response), 'number');
      done();
    });
  });

  it('should create a student', () => {
    repository.addStudent(id, success.newUserStudent).then((response) => {
      assert.equal(typeof (response), 'number');
    });
  });

  it('should create a juridical agent', () => {
    repository.addJuridicalAgent(id, success.newUserJuridical).then((response) => {
      assert.equal(typeof (response), 'number');
    });
  });

  it('should create a physical agent', () => {
    repository.addPhysicalAgent(id, success.newUserPhysical).then((response) => {
      assert.equal(typeof (response), 'number');
    });
  });

  it('should not create a physical agent', (done) => {
    repository.addPhysicalAgent(id, fail.newUserPhysical).then((res) => {
      done(new Error(res));
    }).catch(() => {
      done();
    });
  });

  it('should not create a juridical agent', (done) => {
    repository.addJuridicalAgent(id, fail.newUserJuridical).then((res) => {
      done(new Error(res));
    }).catch(() => {
      done();
    });
  });

  it('should not create a student', (done) => {
    repository.addStudent(id, fail.newUserStudent).then((res) => {
      done(new Error(res));
    }).catch(() => {
      done();
    });
  });

  it('should not create a professor', (done) => {
    repository.addProfessor(id, fail.newUserProfessor).then((res) => {
      done(new Error(res));
    }).catch(() => {
      done();
    });
  });

});

describe('getUserType -> Professor', () => {
  let id = 4500;
  before((done) => {
    repository.addUser({name: `erg${id}`, email: `evgb${id}@email.com`}, success.hash).then((response) => {
      id = response;
      repository.addProfessor(id, {matricula: id}).then(() => {
        done();
      })
    });
  });

  it('should get professor usertype', (done) => {
    repository.getUserType(id).then((userType) => {
      assert.equal(userType, 'Professor');
      done();
    });
  });
});

describe('getUserType -> Student', () => {
  let id = 5500;
  before((done) => {
    repository.addUser({name: `erg${id}`, email: `evgb${id}@email.com`}, success.hash).then((response) => {
      id = response;
      repository.addStudent(id, {matricula: id}).then(() => {
        done();
      })
    });
  });

  it('should get student usertype', (done) => {
    repository.getUserType(id).then((userType) => {
      assert.equal(userType, 'Aluno');
      done();
    });
  });
});

describe('getUserType -> physicalAgent', () => {
  let id = 6500;
  before((done) => {
    repository.addUser({name: `erg${id}`, email: `evgb${id}@email.com`}, success.hash).then((response) => {
      id = response;
      repository.addPhysicalAgent(id, {...success.newUserPhysical, cpf: id}).then(() => {
        done();
      })
    });
  });

  it('should get physical usertype', (done) => {
    repository.getUserType(id).then((userType) => {
      assert.equal(userType, 'Agente Externo');
      done();
    });
  });
});

describe('getUserType -> juridicalAgent', () => {
  let id = 7500;
  before((done) => {
    repository.addUser({name: `erg${id}`, email: `evgb${id}@email.com`}, success.hash).then((response) => {
      id = response;
      repository.addJuridicalAgent(id, {...success.newUserJuridical, cnpj: id}).then(() => {
        done();
      })
    });
  });

  it('should get juridical usertype', (done) => {
    repository.getUserType(id).then((userType) => {
      assert.equal(userType, 'Agente Externo');
      done();
    });
  });
});

describe('getUserType -> Failure', () => {
  let id = 234
  before((done) => {
    repository.addUser({name: `fail${id}`, email: `failure${id}@email.com`}, success.hash).then((response) => {
      id = response;
      done();
    });
  });

  it('should fail -> invalid id', (done) => {
    repository.getUserType({}).then((res) => {
      done(new Error(res));
    }).catch((err) => {
      done();
    });
  });

  it('should fail -> non typed user', (done) => {
    repository.getUserType(id).then((res) => {
      done(new Error(res));
    }).catch(() => {
      done();
    });
  });

});

describe('checkUser', () => {
  let hash;

  before((done) => {
      bcrypt.hash('password', 10, (error, hashzada) => {
        repository.addUser({ name: 'hehe', email: 'login@test.com' }, hashzada);
        done();
    });
  });

  it('should accept login', (done) => {
    repository.checkUser({ email: 'login@test.com', password: 'password' }).then((response) => {
      assert.equal(typeof (response), 'number');
      done();
    });
  });

  it('should reject login -> email', (done) => {
    repository.checkUser({email: 'blabla', password: 'password'}).then((response) => {
      done(new Error(response));
    }).catch(()=>{
      done();
    })
  });

  it('should reject login -> password', (done) => {
    repository.checkUser({email: 'login@test.com', password: 'wrongpassword'}).then((response) => {
      done(new Error(response));
    }).catch(()=>{
      done();
    })
  });

});
