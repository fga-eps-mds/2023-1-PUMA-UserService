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
          const userId = await userRepository.addUser(name, email, hash);
          switch(type) {
            case 'Agente Externo':
              await userRepository.addExternalAgent();
              break;
            case 'Aluno':
              await userRepository.addStudent(userId, matricula);
              break;
            case 'Professor':
              await userRepository.addProfessor(userId, matricula);
              break;
          }

        } catch(e) {
          reject(e);
        }
        resolve();
      }
    });
  });
}

module.exports = { registerUser }
