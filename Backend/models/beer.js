const { DataTypes } = require('sequelize');
const sequelize = require('../util/db');

const Beer = sequelize.define('Beer', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    style: {
      type: DataTypes.STRING,
      allowNull: false
    },
    character: {
      type: DataTypes.STRING,
      allowNull: false
    },
    vol: {
      type: DataTypes.INTEGER,
      allowNull:false
    }
    
  }, {
    tableName: 'beers',
    timestamps: false
  });

module.exports = Beer;
