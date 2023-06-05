const { DataTypes } = require('sequelize');
const database = require('../AppDb');

const Metadata = database.define('Metadata', {
  MetadataId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
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
    allowNull: false,
    primaryKey: true
  },
  softSkills: {
    type: DataTypes.STRING,
    allowNull: false
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
  status: {
    type: DataTypes.ENUM('PENDENTE', 'ACEITO', 'RECUSADO'),
    defaultValue: 'PENDENTE',
  },
}, {
  freezeTableName: true
})

module.exports = Metadata