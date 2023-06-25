/* eslint-disable import/no-unresolved */
const bcrypt = require('bcrypt');
const User = require('../db/model/User');
const User_Properties = require('../db/model/User_Properties');
const User_Type = require('../db/model/User_Type');

module.exports = {
  addUser: (newUser, hash, userTypeId) => new Promise((resolve, reject) => {
    User.create({
      userTypeId,
      initialUserTypeId: userTypeId,
      fullName: newUser.name,
      email: newUser.email,
      passwordHash: hash,
      phoneNumber: newUser.phoneNumber,
      image: newUser.image,
    })
      .then((response) => {
        resolve(response.userId);
      })
      .catch((response) => {
        reject(response);
      });
  }),

  addProfessor: (userId, newUser) => new Promise((resolve, reject) => {
    User_Properties.create({
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
    User_Properties.create({
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
    User_Properties.create({
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
    User_Properties.create({
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
        const user = await User.findOne({where: { email: loginUser.email }});
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
      const userData = await User.findOne({where: { userId: userId }});

      const userPermission = await User_Type.findOne({where: { userTypeId: userData.userTypeId }});

      return {
        userId: userData.userId,
        fullName: userData.fullName,
        email: userData.email,
        isAdmin: userData.isAdmin,
        permission: userPermission,
      };
    } catch (e) {
      throw (e);
    }
  },

  updateUserPassword: async (email, hash) => {
    return new Promise((resolve, reject) => {
      User.update(
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
  },

  checkUserByEmail: (email) => new Promise((resolve, reject) => {
    User.findAll({ where: { email: email }})
      .then((response) => resolve(response))
      .catch((e) => reject(e));
  }),

  getAllUsers: () => new Promise((resolve, reject) => {
    User.findAll().then((response) => {
      resolve(response);
    }).catch((e) => reject(e));
  }),

  getUserProperties: (userId) => new Promise((resolve, reject) => {
    User_Properties.findAll({
      where: {
        userId
      }
    }).then((response) => {
      resolve(response);
    }).catch((error) => {
      reject(error);
    })
  }),

  revokeUserPermissions: (userId) => new Promise((resolve, reject) => {
    User.findOne(
      {
        where: {
          userId: userId
        }
      }).then((responseFindOne) => {
        User.update(
          { userTypeId: responseFindOne.initialUserTypeId },
          { 
            where: { userId: userId },
            returning: true,
          })
          .then((responseUpdate) => {
            resolve(responseUpdate);
          })
          .catch((error) => {
            reject(error);
          });
      }).catch((error) => {
        reject(error);
      })
  }),

};
