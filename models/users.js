const { Model, DataTypes } = require('sequelize');
const connection = require('../config/connection');

class Users extends Model { };

Users.init({
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
  }
}, {
  modelName: 'user', // nama table di database
  freezeTableName: true, // memastikan nama table sama persis dengan model name
  sequelize: connection,
  timestamps: false,
  paranoid: false,
});

module.exports = Users;
