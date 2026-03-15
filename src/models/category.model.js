/*
Modelo: Categorías
*/

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Category = sequelize.define(
    'Category',
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        descripcion: {
            type: DataTypes.STRING(200),
            allowNull: true
        }
    },
    {
        tableName: 'categorias',
        timestamps: true
    }
);

module.exports = Category;