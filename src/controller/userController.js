/* eslint-disable prefer-const */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
const bcrypt = require('bcrypt');
const emailService = require('../services/emailService');

const saltRounds = 10;
const userRepository = require('../repository/userRepository');

module.exports = {
  registerUser: (newUser) => new Promise((resolve, reject) => {
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
  }),

  checkUserAndGetUserData: async (user) => {
    let userId;

    userId = await userRepository.checkUser(user);
    let userData = await userRepository.getUserData(userId);

    return { ...userData };
  },

  updatePassword: async (user) => new Promise((resolve, reject) => {
    try {
      const { email, password } = user;
      bcrypt.hash(password, saltRounds, async (error, hash) => {
        if (error) {
          reject(error);
        } else {
          await userRepository.updateUserPassword(email, hash);
        }
      });
      resolve({ email });
    } catch (e) {
      console.log(e);
    }
  }),

  recoverPassword: (user) => new Promise((resolve, reject) => {
    try {
      const { email } = user;

      const info = emailService.sendEmail('puma@gmail.com', email);
      resolve(info);
    } catch (e) {
      reject(e);
    }
  }),

};
