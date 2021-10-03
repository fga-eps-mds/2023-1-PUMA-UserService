const bcrypt = require('bcrypt');
const saltRounds = 10;
const userRepository = require("../repository/userRepositoty");

function registerUser(newUser) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(newUser.password, saltRounds, async (error, hash) => {
      if (error) {
        reject(error);
      } else {
        try {
          const userId = await userRepository.addUser(newUser, hash);
          switch (newUser.type) {
            case 'Agente Externo':
              switch (newUser.externalAgentType) {
                case 'Pessoa Fisica':
                  await userRepository.addPhysicalAgent(userId, newUser);
                  break;
                case 'Pessoa Juridica':
                  await userRepository.addJuridicalAgent(userId, newUser);
                  break;
              }
              break;
            case 'Aluno':
              await userRepository.addStudent(userId, newUser);
              break;
            case 'Professor':
              await userRepository.addProfessor(userId, newUser);
              break;
          }

        } catch (e) {
          reject(e);
        }
        resolve();
      }
    });
  });
}

module.exports = { registerUser }
