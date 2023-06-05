/* eslint-disable import/no-unresolved */
const bcrypt = require('bcrypt');
const Common_User = require('../db/model/Common_User');
const Juridical_Agent = require('../db/model/Juridical_Agent');
const Physical_Agent = require('../db/model/Physical_Agent');
const Student = require('../db/model/Student');
const Teacher = require('../db/model/Teacher');

module.exports = {
  addUser: (newUser, hash) => new Promise((resolve, reject) => {
    Common_User.create({
      fullName: newUser.name,
      email: newUser.email,
      passwordHash: hash,
      isAdmin: false,
      phoneNumber: newUser.phoneNumber
    })
      .then((response) => {
        resolve(response.userId);
      })
      .catch((response) => {
        reject(response);
      });
  }),

  addProfessor: (userId, newUser) => new Promise((resolve, reject) => {
    Teacher.create({
      userId: userId,
      regNumber: newUser.matricula,
      departament: newUser.departament,
      course: newUser.course,
      university: newUser.university
    })
      .then((response) => {
        resolve(response.userId);
      })
      .catch((response) => {
        reject(response);
      });
  }),

  addStudent: (userId, newUser) => new Promise((resolve, reject) => {
    Student.create({
      userId: userId,
      regNumber: newUser.matricula,
      softSkills: ' ',
    })
      .then((response) => {
        resolve(response.userId);
      })
      .catch((response) => {
        reject(response);
      });
  }),

  addJuridicalAgent: (userId, newUser) => new Promise((resolve, reject) => {
    Juridical_Agent.create({
      userId: userId,
      cnpj: newUser.cnpj,
      companyName: newUser.companyName,
      socialReason: newUser.socialReason
    })
      .then((response) => {
        resolve(response.userId);
      })
      .catch((response) => {
        reject(response);
      });
  }),

  addPhysicalAgent: (userId, newUser) => new Promise((resolve, reject) => {
    Physical_Agent.create({
      userId: userId,
      cpf: newUser.cpf
    })
      .then((response) => {
        resolve(response.userId);
      })
      .catch((response) => {
        reject(response);
      });
  }),

  checkUser: (loginUser) =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise(async (resolve, reject) => {
      try {
        const user = await Common_User.findOne({where: { email: loginUser.email }});
        if(user){
          if (await bcrypt.compare(loginUser.password, user.passwordHash)) {
            resolve(user.userId);
          } else {
            reject(null);
          }
        }else{
          reject(null);
        }
        
      } catch (e) {
        console.log(e)
        reject(e);
      }
    }),

  getUserData: async (userId) => {
    try {
      let type = null;

      const userData = await Common_User.findOne({where: { userId: userId }});

      const professorResult = await Teacher.findOne({where: { userId: userId }});
      if (professorResult) {
        type = 'Professor';
      }

      const studentResult = await Student.findOne({where: { userId: userId }});
      if (studentResult) {
        type = 'Aluno';
      }

      const physicalAgentResult = await Physical_Agent.findOne({where: { userId: userId }});
      if (physicalAgentResult) {
        type = 'Agente Externo';
      }

      const juridicalAgentResult = await Juridical_Agent.findOne({where: { userId: userId }});
      if (juridicalAgentResult) {
        type = 'Agente Externo';
      }

      return {
        userId: userData.userId,
        fullName: userData.fullName,
        email: userData.email,
        isAdmin: userData.isAdmin,
        type,
      };
    } catch (e) {
      throw (e);
    }
  },

  updateUserPassword: async (email, hash) => {
    try {
      return new Promise((resolve, reject) => {
        Common_User.update(
          { passwordHash: hash },
          { where: { email:email }}
          )
          .then((_response) => {
            resolve();
          })
          .catch((response) => {
            reject(response);
          });
      });
    } catch (e) {
      reject(e);
    }
  },

  checkUserByEmail: (email) => new Promise((resolve, reject) => {
    try {
      Common_User.findAll({ where: { email: email }})
        .then((response) => resolve(response))
        .catch((e) => reject(e));
    } catch (e) {
      reject(e);
    }
  }),
};
