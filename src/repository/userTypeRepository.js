/* eslint-disable import/no-unresolved */
const db = require('../../dbconfig/dbConfig');

module.exports = {
  addUserType: (newUserType) => new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO USER_TYPE(typeName,description) \
        VALUES ($1,$2) RETURNING *',
      [newUserType.typeName, newUserType.description],
    )
      .then((response) => {
        resolve(response.rows[0].userTypeid);
      })
      .catch((response) => {
        reject(response);
      });
  }),

  getUserType: (userTypeId) => new Promise((resolve, reject) => {
    const query = userTypeId ? 
    db.query(
      'SELECT * FROM USER_TYPE WHERE userTypeId = $1',
      [userTypeId],
    ) : 
    db.query(
      'SELECT * FROM USER_TYPE',
      [],
    ); 
    query.then((response) => {
      resolve(response.rows);
    })
    .catch((response) => {
      reject(response);
    });
  }),

  updateUserType: (userTypeId, newUserType) => new Promise((resolve, reject) => {
    db.query(
      'UPDATE USER_TYPE \
        SET typeName = $2, description = $3 \
        WHERE userTypeId = $1 RETURNING *',
      [userTypeId, newUserType.typeName, newUserType.description],
    )
      .then((response) => {
        resolve(response.rows[0].userTypeid);
      })
      .catch((response) => {
        reject(response);
      });
  }),

  deleteUserType: (userTypeId) => new Promise((resolve, reject) => {
    db.query(
      'DELETE FROM USER_TYPE \
      WHERE userTypeId = $1',
      [userTypeId],
    )
      .then((response) => {
        resolve();
      })
      .catch((response) => {
        reject(response);
      });
  }),

};
