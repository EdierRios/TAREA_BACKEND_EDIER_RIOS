

const dbConfig = require('./config/db.config.js');


const fs = require('fs');

const path = require('path');
const Sequelize = require('sequelize');


const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    logging: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


fs.readdirSync(__dirname)
    .filter(file => {

        return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) === '.js');
    })
    .forEach(file => {

        const model = require(path.join(__dirname, file))(sequelize, Sequelize);
        db[model.name] = model;
    });


db.Profesor = require('./Profesor.js')(sequelize, Sequelize);

db.Profesor.hasMany(db.Estudiante, {
    foreignKey: 'profesor_guia_id',
    as: 'estudiantes'
});


db.Estudiante.belongsTo(db.Profesor, {
    foreignKey: 'profesor_guia_id',
    as: 'profesorGuia'
});


module.exports = db;
