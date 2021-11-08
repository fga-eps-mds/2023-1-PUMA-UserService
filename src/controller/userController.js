/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
const bcrypt = require('bcrypt');
// eslint-disable-next-line no-unused-vars
const User = require('../models/user');

const saltRounds = 10;
const userRepository = require('../repository/userRepository');

module.exports = {
  registerUser: (newUser) => {
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
                  default:
                    reject(new Error('Tipo não encontrado'));
                }
                break;
              case 'Aluno':
                await userRepository.addStudent(userId, newUser);
                break;
              case 'Professor':
                await userRepository.addProfessor(userId, newUser);
                break;
              default:
                reject(new Error('Tipo não encontrado'));
            }
          } catch (e) {
            reject(e);
          }
          resolve();
        }
      });
    });
  },

  checkUserAndGetType: async (user) => {
    let userId, userType;
    
    userId = await userRepository.checkUser(user);
    userType = await userRepository.getUserType(userId);

    return {userId, userType};
  }
}
