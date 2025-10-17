// models/Grupo.js
// Este modelo representa la tabla 'Grupos' y contiene el profesor guía asignado.
module.exports = (sequelize, Sequelize) => {
    const Grupo = sequelize.define("Grupo", {
        grupo_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_grupo: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        grado: {
            type: Sequelize.STRING(10),
            allowNull: false
        },
        // La clave foránea profesor_guia_id se define en las relaciones de db.config.js
        // pero se incluye aquí para claridad, aunque Sequelize la manejaría automáticamente.
        profesor_guia_id: {
            type: Sequelize.INTEGER,
            allowNull: true // Puede que no todos los grupos tengan un guía al inicio
        }
    }, {
        tableName: 'Grupos', // Nombre exacto de la tabla en SQL
        timestamps: false // Deshabilita los campos createdAt y updatedAt
    });

    return Grupo;
};
