/* eslint-disable prefer-const */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
const bcrypt = require('bcrypt');
const emailService = require('../services/emailService');

const saltRounds = 10;
const userRepository = require('../repository/userRepository');
const Common_User = require('../db/model/Common_User');

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
              
              const admins = await Common_User.findAll({
                where: {
                  isAdmin: true
                }
              });
              for(const admin of admins){
                await emailService.sendEmailAdminNewTeacher(process.env.GMAIL_ACCOUNT, admin.email)
              }
              break;
            default:
              reject(new Error('Tipo não encontrado'));
          }
          await emailService.sendEmailRegister(process.env.GMAIL_ACCOUNT, newUser.email, newUser.name);
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
          await emailService.sendEmailConfimationPasswordUpdated(process.env.GMAIL_ACCOUNT, email);
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

      userRepository.checkUserByEmail(email)
        .then(async (response) => {
          if (response.length > 0) {
            const info = await emailService.sendEmail(process.env.GMAIL_ACCOUNT, email);
            resolve({
              ...info,
              status: 200,
            });
          } else {
            resolve({
              status: 404,
            });
          }
        });
    } catch (e) {
      reject(e);
    }
  }),

};
