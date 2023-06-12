/* eslint-disable prefer-const */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
const bcrypt = require('bcrypt');
const emailService = require('../services/emailService');

const saltRounds = 10;
const userRepository = require('../repository/userRepository');
const userTypeRepository = require('../repository/userTypeRepository');
const User = require('../db/model/User');

module.exports = {
  registerUser: (newUser) => new Promise((resolve, reject) => {
    bcrypt.hash(newUser.password, saltRounds, async (error, hash) => {
      if (error) {
        reject(error);
      } else {
        try {
          let userType;
          if(newUser.type === 'Agente Externo' && (newUser.externalAgentType === 'Pessoa Fisica' || newUser.externalAgentType === 'Pessoa Juridica')) {
            userType = await userTypeRepository.getUserTypeByName(newUser.externalAgentType);
          } else if(newUser.type === 'Aluno' || newUser.type === 'Professor') {
            userType = await userTypeRepository.getUserTypeByName(newUser.type);
          } else {
            reject(new Error('Tipo não encontrado'));
          }

          const userId = await userRepository.addUser(newUser, hash, userType[0].userTypeId);
          switch (userType[0].typeName) {
            case 'Pessoa Fisica':
              await userRepository.addPhysicalAgent(userId, newUser);
              break;
            case 'Pessoa Juridica':
              await userRepository.addJuridicalAgent(userId, newUser);
              break;
            case 'Aluno':
              await userRepository.addStudent(userId, newUser);
              break;
            case 'Professor':
              await userRepository.addProfessor(userId, newUser);
              
              const admins = await User.findAll({
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
          console.log(e);
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

  getAllUsers: () => new Promise(async (resolve, reject) => {
    try {
      const users = await userRepository.getAllUsers();
      for(var user of users) {
        user.user_properties = await userRepository.getUserProperties(user.userId);
      }
      resolve(users);
    } catch(error) {
      reject(error);
    }
  }),

};
