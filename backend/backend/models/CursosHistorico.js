// models/CursosHistorico.js
// Este modelo representa la tabla de unión 'Cursos_Historico'
module.exports = (sequelize, Sequelize) => {
    const CursosHistorico = sequelize.define("CursosHistorico", {
        registro_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        grado: {
            type: Sequelize.STRING(10),
            allowNull: false
        },
        año_academico: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        nota_promedio_final: {
            type: Sequelize.DECIMAL(5, 2)
        },
        estado_curso: {
            type: Sequelize.STRING(20),
            allowNull: false
        },
        // estudiante_id y grupo_id se definen automáticamente por la relación
    }, {
        tableName: 'Cursos_Historico', // Nombre exacto de la tabla en SQL
        timestamps: false,
        // Definición de la clave única compuesta (estudiante_id, grado, año_academico)
        indexes: [
            {
                unique: true,
                fields: ['estudiante_id', 'grado', 'año_academico']
            }
        ]
    });

    return CursosHistorico;
};
