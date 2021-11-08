module.exports = {
  success: {
    hash: 'ilawefybabgveouyvbfev',
    newUserProfessor: {
      name: 'foo',
      email: 'foo@bar.com',
      matricula: 123456,
    },
    newUserStudent: {
      name: 'hehe',
      email: 'student@email.com',
      matricula: 765442,
    },
    newUserJuridical: {
      name: 'agent',
      email: 'agent@email.com',
      cnpj: 56854641,
      cep: 6546546,
      companyName: 'foo bar',
      socialReason: 'rensgans'
    },
    newUserPhysical: {
      name: 'physical',
      email: 'physical@email.com',
      cpf: 5346854648
    },
  },
  fail: {
    newUserProfessor: {
      name: 'foo',
      email: 'foo@bar.com',
    },
    newUserStudent: {
      name: 'hehe',
      email: 'student@email.com',
    },
    newUserJuridical: {
      name: 'agent',
      email: 'agent@email.com',
      cep: 6546546,
      companyName: 'foo bar',
      socialReason: 'rensgans'
    },
    newUserPhysical: {
      name: 'physical',
      email: 'physical@email.com'
    },
  },
}
