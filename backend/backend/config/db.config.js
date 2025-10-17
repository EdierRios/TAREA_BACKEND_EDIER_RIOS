
require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: process.env.DB_PORT,
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.Estudiante = require('../models/Estudiante')(sequelize, Sequelize);
db.Grupo = require('../models/grupos')(sequelize, Sequelize); // Correcto: 'grupos'
db.Profesor = require('../models/profesor')(sequelize, Sequelize);
db.Informe = require('../models/Informe')(sequelize, Sequelize);
db.CursosHistorico = require('../models/CursosHistorico')(sequelize, Sequelize);


db.Grupo.belongsTo(db.Profesor, {
    foreignKey: 'profesor_guia_id',
    as: 'ProfesorGuia'
});
db.Profesor.hasMany(db.Grupo, {
    foreignKey: 'profesor_guia_id',
    as: 'GruposGuiados'
});

db.Informe.belongsTo(db.Grupo, {
    foreignKey: 'grupo_id',
    as: 'Grupo'
});
db.Grupo.hasMany(db.Informe, {
    foreignKey: 'grupo_id',
    as: 'InformesGenerados'
});

db.Estudiante.belongsToMany(db.Grupo, {
    through: db.CursosHistorico,
    foreignKey: 'estudiante_id',
    as: 'HistorialGrupos'
});
db.Grupo.belongsToMany(db.Estudiante, {
    through: db.CursosHistorico,
    foreignKey: 'grupo_id',
    as: 'EstudiantesAsignados'
});

db.CursosHistorico.belongsTo(db.Estudiante, { foreignKey: 'estudiante_id' });
db.CursosHistorico.belongsTo(db.Grupo, { foreignKey: 'grupo_id' });

module.exports = db;