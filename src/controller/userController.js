/* eslint-disable prefer-const */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
const bcrypt = require('bcrypt');
const emailService = require('../services/emailService');

const saltRounds = 10;
const userRepository = require('../repository/userRepository');
const Juridical_Agent = require('../db/model/Juridical_Agent');
const Physical_Agent = require('../db/model/Physical_Agent');
const Common_User = require('../db/model/Common_User');
const Student = require('../db/model/Student');
const Teacher = require('../db/model/Teacher');

module.exports = {
  registerUser: (newUser) => new Promise((resolve, reject) => {
    bcrypt.hash(newUser.password, saltRounds, async (error, hash) => {
      if (error) {
        reject(error);
      } else {
        try {
          const newUserDb = await Common_User.create({
            fullName: newUser.name,
            email: newUser.email,
            passwordHash: hash,
            isAdmin: false,
            phoneNumber: newUser.phoneNumber
          });
          switch (newUser.type) {
            case 'Agente Externo':
              switch (newUser.externalAgentType) {
                case 'Pessoa Fisica':
                  await Physical_Agent.create({
                    userId: newUserDb.userId,
                    cpf: newUser.cpf
                  });
                  break;
                case 'Pessoa Juridica':
                  await Juridical_Agent.create({
                    userId: newUserDb.userId,
                    cnpj: newUser.cnpj,
                    companyName: newUser.companyName,
                    socialReason: newUser.socialReason
                  });
                  break;
                default:
                  reject(new Error('Tipo não encontrado'));
              }
              break;
            case 'Aluno':
              await Student.create({
                userId: newUserDb.userId,
                regNumber: newUser.matricula,
                softSkills: ' ',
              });
              break;
            case 'Professor':
              await Teacher.create({
                userId: newUserDb.userId,
                regNumber: newUser.matricula,
              });
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
          if (response.rows.length > 0) {
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
