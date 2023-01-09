const assert = require('assert');
const bcrypt = require('bcrypt');
const dbConfig = require('../../dbconfig/dbConfig');
const dbSchema = require('../../dbconfig/dbSchema');

const constants = require('../utils/constants');

const success = constants.success;
const fail = constants.fail

describe('dbconfig/dbSchema.js -> Object', () => {
    it('Should have freeze len -> DBSCHEMALEN', () => {
        assert(Object.isFrozen(dbSchema.DBSCHEMALEN));
    });

    it('Should have freeze database -> DBSCHEMA', () => {
        assert(Object.isFrozen(dbSchema.DBSCHEMA));
    });
    
});
  