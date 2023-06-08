/* eslint-disable import/no-unresolved */
const User_Type = require('../db/model/User_Type');

module.exports = {
  addUserType: (newUserType) => new Promise((resolve, reject) => {
    User_Type.create({
      typeName: newUserType.typeName
    })
      .then((response) => {
        resolve(response.userTypeid);
      })
      .catch((response) => {
        reject(response);
      });
  }),

  getUserType: (userTypeId) => new Promise((resolve, reject) => {

    if(userTypeId){
      User_Type.findAll({
        where: {
          userTypeId: userTypeId
        }
      })
      .then((response) => {
        resolve(response);
      })
      .catch((response) => {
        reject(response);
      });
    }else{
      User_Type.findAll()
      .then((response) => {
        resolve(response);
      })
      .catch((response) => {
        reject(response);
      });
    }
  }),

  getUserTypeByName: (userTypeName) => new Promise((resolve, reject) => {
    User_Type.findAll({
      where: {
        typeName: userTypeName
      }
    })
    .then((response) => {
      resolve(response);
    })
    .catch((response) => {
      reject(response);
    });
  }),

  updateUserType: (userTypeId, newUserType) => new Promise((resolve, reject) => {
    User_Type.update(
      { typeName: newUserType.typeName },
      { where: { userTypeId: userTypeId}, returning: true}
    )
      .then((response) => {
        resolve(response[1][0].userTypeId);
      })
      .catch((response) => {
        reject(response);
      });
  }),

  deleteUserType: (userTypeId) => new Promise((resolve, reject) => {
    User_Type.destroy({
      where: { userTypeId: userTypeId }
    })
      .then((response) => {
        resolve(true);
      })
      .catch((response) => {
        reject(response);
      });
  }),

};
