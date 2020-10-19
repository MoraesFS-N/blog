const Sequelize = require('sequelize');

const connection = new Sequelize('blog','root','Moraes098',{
    host: 'localhost',
    dialect: 'mysql'
});


module.exports = connection;