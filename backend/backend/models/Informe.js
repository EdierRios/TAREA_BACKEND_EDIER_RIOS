// models/Informe.js
// Este modelo representa la tabla 'Informes'
module.exports = (sequelize, Sequelize) => {
    const Informe = sequelize.define("Informe", {
        informe_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_manual: {
            type: Sequelize.STRING(50),
            unique: true,
            allowNull: false
        },
        grado: {
            type: Sequelize.STRING(10),
            allowNull: false
        },
        fecha_generacion: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        descripcion: {
            type: Sequelize.STRING(255)
        }
        // grupo_id se define como relación abajo
    }, {
        tableName: 'Informes', // Nombre exacto de la tabla en SQL
        timestamps: false
    });

    return Informe;
};
