/* eslint-disable no-restricted-syntax */
/* eslint-disable no-async-promise-executor */
/* eslint-disable no-use-before-define */
const userTypeRepository = require('../repository/userTypeRepository');

module.exports = {
    addUserType: (newUserType) => new Promise(async (resolve, reject) => {
        try {
            const userTypeResponse = await userTypeRepository.addUserType(newUserType);

            resolve({
                typeName: userTypeResponse,
            });
        } catch (e) {
            console.log(e);
            reject(e);
        }
    }),

    getUserType: (userTypeId) => new Promise(async (resolve, reject) => {
        try {
            if(userTypeId){
                const response = await userTypeRepository.getUserType(userTypeId);
                resolve(response[0]);
            }else{
                const response = await userTypeRepository.getUserType();
                resolve(response);
            }
        } catch (e) {
            console.log(e);
            reject(e);
        }
    }),

    getUserTypeByName: (userTypeName) => new Promise(async (resolve, reject) => {
        try {
            const response = await userTypeRepository.getUserTypeByName(userTypeName);
            resolve(response);
        } catch (e) {
            console.log(e);
            reject(e);
        }
    }),

    updateUserType: (userTypeId, newUserType) => new Promise(async (resolve, reject) => {
        try {
            const response = await userTypeRepository.updateUserType(userTypeId, newUserType);
            resolve(response);
        } catch (e) {
            console.log(e);
            reject(e);
        }
    }),

    deleteUserType: (userTypeId) => new Promise(async (resolve, reject) => {
        try {
            const response = await userTypeRepository.deleteUserType(userTypeId);
            resolve(response);
        } catch (e) {
            console.log(e);
            reject(e);
        }
    }),

};