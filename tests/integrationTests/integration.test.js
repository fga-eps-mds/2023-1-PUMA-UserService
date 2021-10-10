const assert = require('assert');

const newUser = {
    name: this.name,
    email: this.email,
    password: this.password,
    repeatPassword: this.repeatPassword,
    matricula: this.matricula,
    type: this.type,
    externalAgentType: this.externalAgentType,
    cnpj: this.cnpj,
    cep: this.cep,
    companyName: this.companyName,
    socialReason: this.socialReason,
    cpf: this.cpf,
  };

describe('coco', () => {
    it('shoud be gay',() => {
        assert.equal(1, 1);
    });
})
