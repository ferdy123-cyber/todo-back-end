const { Model, DataTypes } = require('sequelize');
const connection = require('../config/connection');

class Todos extends Model { };

Todos.init({
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  user_id: {
    type: DataTypes.UUIDV4,
    allowNull: false
  }
}, {
  modelName: 'todos', // nama table di database
  freezeTableName: true, // memastikan nama table sama persis dengan model name
  sequelize: connection,
  timestamps: false,
  paranoid: false,
});

module.exports = Todos;
