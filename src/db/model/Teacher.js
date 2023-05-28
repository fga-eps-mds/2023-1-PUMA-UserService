const { DataTypes } = require('sequelize');
const database = require('../AppDb');

const Teacher = database.define('Teacher', {
  userId: {
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: {
        tableName: 'Common_User',
        schema: 'public',
      },
      key: 'userId',
    },
  },
  isIdealizer: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  regNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
}, {
  freezeTableName: true,
});

module.exports = Teacher;
