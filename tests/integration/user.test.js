/* eslint-disable */
const axios = require('axios');
const assert = require('assert');
const request = require('supertest');
const app = require('../utils/testapp');
const CONSTANTS = require('../utils/constants');
const environment = require('../../src/config/environment.config');
const { Pool } = require('pg');


environment.configEnv();

describe('Login Success', () => {
    it('Should student login', (done) => {
        request(app)
            .post('/login')
            .set('Accept', 'application/json')
            .send(CONSTANTS.USER.LOGIN.STUDENT.SUCCESS.T1)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });

    it('Should professor login', (done) => {
        request(app)
            .post('/login')
            .set('Accept', 'application/json')
            .send(CONSTANTS.USER.LOGIN.PROFESSOR.SUCCESS.T1)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });

    it('Should juridical agent login', (done) => {
        request(app)
            .post('/login')
            .set('Accept', 'application/json')
            .send(CONSTANTS.USER.LOGIN.JURIDICAL_AGENT.SUCCESS.T1)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });

    it('Should physical agent login', (done) => {
        request(app)
            .post('/login')
            .set('Accept', 'application/json')
            .send(CONSTANTS.USER.LOGIN.PHYSICAL_AGENT.SUCCESS.T1)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });
});

describe('Login Failure', () => {
    it('Should not student login', (done) => {
        request(app)
            .post('/login')
            .set('Accept', 'application/json')
            .send(CONSTANTS.USER.LOGIN.STUDENT.FAILURE.T1)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });

    it('Should not professor login', (done) => {
        request(app)
            .post('/login')
            .set('Accept', 'application/json')
            .send(CONSTANTS.USER.LOGIN.PROFESSOR.FAILURE.T1)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });

    it('Should not juridical agent login', (done) => {
        request(app)
            .post('/login')
            .set('Accept', 'application/json')
            .send(CONSTANTS.USER.LOGIN.JURIDICAL_AGENT.FAILURE.T1)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });

    it('Should not physical agent login', (done) => {
        request(app)
            .post('/login')
            .set('Accept', 'application/json')
            .send(CONSTANTS.USER.LOGIN.PHYSICAL_AGENT.FAILURE.T1)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });
});

describe('Register Success', () => {
    it('Should student register', (done) => {
        request(app)
            .post('/register')
            .set('Accept', 'application/json')
            .send(CONSTANTS.USER.REGISTER.STUDENT.SUCCESS.T1)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });

    it('Should professor register', (done) => {
        request(app)
            .post('/register')
            .set('Accept', 'application/json')
            .send(CONSTANTS.USER.REGISTER.PROFESSOR.SUCCESS.T1)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });

    it('Should juridical agent register', (done) => {
        request(app)
            .post('/register')
            .set('Accept', 'application/json')
            .send(CONSTANTS.USER.REGISTER.JURIDICAL_AGENT.SUCCESS.T1)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });

    it('Should physical agent register', (done) => {
        request(app)
            .post('/register')
            .set('Accept', 'application/json')
            .send(CONSTANTS.USER.REGISTER.PHYSICAL_AGENT.SUCCESS.T1)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });
});

describe('Register Failure', () => {
    it('Should not student register', (done) => {
        request(app)
            .post('/register')
            .set('Accept', 'application/json')
            .send(CONSTANTS.USER.REGISTER.STUDENT.FAILURE.T1)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });

    it('Should not professor register', (done) => {
        request(app)
            .post('/register')
            .set('Accept', 'application/json')
            .send(CONSTANTS.USER.REGISTER.PROFESSOR.FAILURE.T1)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });

    it('Should not juridical agent register', (done) => {
        request(app)
            .post('/register')
            .set('Accept', 'application/json')
            .send(CONSTANTS.USER.REGISTER.JURIDICAL_AGENT.FAILURE.T1)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });

    it('Should not physical agent register', (done) => {
        request(app)
            .post('/register')
            .set('Accept', 'application/json')
            .send(CONSTANTS.USER.REGISTER.PHYSICAL_AGENT.FAILURE.T1)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });
});

describe('Data Query', () => {
    it('Should get student by matricula', (done) => {
        request(app)
            .get('/aluno/' + CONSTANTS.USER.REGISTER.STUDENT.SUCCESS.T1.matricula)
            .expect(200)
            .then((response) => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });
});


describe('Initial page', () => {
    it('Should get initial page', (done) => {
        request(app)
            .get('/')
            .expect(200)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });
});

describe('Update Password Sucess', () => {
    it('Should Update Student Password', (done) => {
        request(app)
            .put('/password/' + CONSTANTS.USER.LOGIN.STUDENT.SUCCESS.T1.email)
            .set('Accept', 'application/json')
            .send(CONSTANTS.USER.LOGIN.STUDENT.SUCCESS.T1.password)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });

    it('Should Update Professor Password', (done) => {
        request(app)
            .put('/password/' + CONSTANTS.USER.LOGIN.PROFESSOR.SUCCESS.T1.email)
            .set('Accept', 'application/json')
            .send(CONSTANTS.USER.LOGIN.PROFESSOR.SUCCESS.T1.password)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });

    it('Should Update Juridical Agent Password', (done) => {
        request(app)
            .put('/password/' + CONSTANTS.USER.LOGIN.JURIDICAL_AGENT.SUCCESS.T1.email)
            .set('Accept', 'application/json')
            .send(CONSTANTS.USER.LOGIN.JURIDICAL_AGENT.SUCCESS.T1.password)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });

    it('Should Update Physical Agent Password', (done) => {
        request(app)
            .put('/password/' + CONSTANTS.USER.LOGIN.PHYSICAL_AGENT.SUCCESS.T1.email)
            .set('Accept', 'application/json')
            .send(CONSTANTS.USER.LOGIN.PHYSICAL_AGENT.SUCCESS.T1.password)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });


});

describe('Recover Password Success', () => {
    it('Should Recover Aluno Password', (done) => {
        request(app)
            .post('/recover')
            .set('Accept', 'application/json')
            .send(CONSTANTS.USER.RECOVER.STUDENT.SUCCESS.T1)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });

    it('Should Recover Professor Password', (done) => {
        request(app)
            .post('/recover')
            .set('Accept', 'application/json')
            .send(CONSTANTS.USER.RECOVER.PROFESSOR.SUCCESS.T1)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });

    it('Should Recover PF Password', (done) => {
        request(app)
            .post('/recover')
            .set('Accept', 'application/json')
            .send(CONSTANTS.USER.RECOVER.PHYSICAL_AGENT.SUCCESS.T1)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });

    it('Should Recover PJ Password', (done) => {
        request(app)
            .post('/recover')
            .set('Accept', 'application/json')
            .send(CONSTANTS.USER.RECOVER.JURIDICAL_AGENT.SUCCESS.T1)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });
});


describe('Recover Password Failure', () => {
    it('Should not Recover Aluno Password', (done) => {
        request(app)
            .post('/recover')
            .set('Accept', 'application/json')
            .send(CONSTANTS.USER.RECOVER.STUDENT.FAILURE.T1)
            .expect('Content-Type', /json/)
            .expect(404)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });

    it('Should not Recover Professor Password', (done) => {
        request(app)
            .post('/recover')
            .set('Accept', 'application/json')
            .send(CONSTANTS.USER.RECOVER.PROFESSOR.FAILURE.T1)
            .expect('Content-Type', /json/)
            .expect(404)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });

    it('Should not Recover PF Password', (done) => {
        request(app)
            .post('/recover')
            .set('Accept', 'application/json')
            .send(CONSTANTS.USER.RECOVER.PHYSICAL_AGENT.FAILURE.T1)
            .expect('Content-Type', /json/)
            .expect(404)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });

    it('Should not Recover PJ Password', (done) => {
        request(app)
            .post('/recover')
            .set('Accept', 'application/json')
            .send(CONSTANTS.USER.RECOVER.JURIDICAL_AGENT.FAILURE.T1)
            .expect('Content-Type', /json/)
            .expect(404)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });
});