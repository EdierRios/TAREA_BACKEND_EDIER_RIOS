
module.exports = (sequelize, Sequelize) => {
    const Profesor = sequelize.define("Profesor", {
        profesor_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        apellido: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        cedula: {
            type: Sequelize.STRING(20),
            unique: true,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING(150),
            unique: true
        },
        fecha_registro: {
            type: Sequelize.DATEONLY
        }
    }, {
        tableName: 'Profesores', // Nombre exacto de la tabla en SQL
        timestamps: false
    });

    return Profesor;
};
