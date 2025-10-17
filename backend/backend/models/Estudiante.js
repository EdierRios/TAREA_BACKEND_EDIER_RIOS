// models/Estudiante.js
// Este modelo representa la tabla 'Estudiantes' en la base de datos,
// incluyendo toda la información personal y de contacto del estudiante.
module.exports = (sequelize, Sequelize) => {
    const Estudiante = sequelize.define("Estudiante", {
        estudiante_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        codigo: {
            type: Sequelize.STRING(20),
            unique: true,
            allowNull: false
        },
        identificacion_tipo: {
            type: Sequelize.STRING(10),
            allowNull: false
        },
        documento_numero: {
            type: Sequelize.STRING(20),
            unique: true,
            allowNull: false
        },
        primer_nombre: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        segundo_nombre: {
            type: Sequelize.STRING(100)
        },
        primer_apellido: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        segundo_apellido: {
            type: Sequelize.STRING(100)
        },
        sexo: {
            type: Sequelize.STRING(10),
            allowNull: false
        },
        fecha_nacimiento: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        telefono_residencia: {
            type: Sequelize.STRING(20)
        },
        celular: {
            type: Sequelize.STRING(20)
        },
        email: {
            type: Sequelize.STRING(150),
            unique: true
        },
        ciudad: {
            type: Sequelize.STRING(100)
        },
        direccion: {
            type: Sequelize.STRING(255)
        },
        estado: {
            type: Sequelize.STRING(10),
            allowNull: false,
            defaultValue: 'Activo' // 'Activo', 'Inactivo', 'Egresado'
        }
    }, {
        tableName: 'Estudiantes', // Nombre exacto de la tabla en SQL
        timestamps: false // Deshabilita los campos createdAt y updatedAt
    });

    return Estudiante;
};
