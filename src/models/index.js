/*
Despliegue de los modelos en la base de datos
*/

const sequelize = require('../config/database');

const Rol = require('./role.model');
const User = require('./user.model');
const Category = require('./category.model');
const Product = require('./product.model');

Rol.hasMany(User, {
    foreignKey: 'rolId',
    as: 'usuarios'
});

User.belongsTo(Rol, {
    foreignKey: 'rolId',
    as: 'rol'
});

Category.hasMany(Product, {
    foreignKey: 'categoryId',
    as: 'productos'
});

Product.belongsTo(Category, {
    foreignKey: 'categoryId',
    as: 'categoria'
});

const db = {
    sequelize,
    Rol,
    User,
    Category,
    Product
};

module.exports = db;