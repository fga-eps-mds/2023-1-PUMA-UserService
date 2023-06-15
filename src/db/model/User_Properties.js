const { DataTypes } = require('sequelize');
const database = require('../AppDb');

const User_Properties = database.define('User_Properties', {
  userPropertiesId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: {
        tableName: "User",
        schema: "public",
      },
      key: "userId"
    },
  },
  cnpj: {
    type: DataTypes.STRING,
    unique: true
  },
  companyName: {
    type: DataTypes.STRING,
  },
  socialReason: {
    type: DataTypes.STRING,
  },
  cpf: {
    type: DataTypes.STRING,
    unique: true
  },
  regNumber: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
  },
  softSkills: {
    type: DataTypes.STRING
  },
  isIdealizer: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  statusTeacher: {
    type: DataTypes.ENUM('PENDENTE', 'ACEITO', 'RECUSADO'),
    defaultValue: 'PENDENTE',
  },
  departament: {
    type: DataTypes.STRING,
    allowNull: false
  },
  course: {
      type: DataTypes.STRING,
      allowNull: false
  },
  university: {
      type: DataTypes.STRING,
      allowNull: false
  },
}, {
  freezeTableName: true
})

module.exports = User_Properties