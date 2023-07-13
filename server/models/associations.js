const { DataTypes } = require('sequelize');

const sequelize = require('../utils/dbConnection').sequelize

const Desk = sequelize.define("Desk", {
    desk_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    floor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,

    },
    x_line_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    y_line_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('NOW()')
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('NOW()')
    }
});


const Reservation = sequelize.define("Reservation", {
    reservation_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    desk_id: {
        type: DataTypes.INTEGER,
        allowNull: false,

    },
    start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    end_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    reserved_by: {
        type: DataTypes.STRING,
        allowNull: false
    }, createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('NOW()')
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('NOW()')
    }
});


const Floor = sequelize.define("Floor", {

    floor_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    floor_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique:true//buraya bak

    }, createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('NOW()')
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('NOW()')
    }


})
Desk.hasMany(Reservation, { foreignKey: 'desk_id' });
Reservation.belongsTo(Desk, { foreignKey: 'desk_id' });
Desk.belongsTo(Floor, { foreignKey: 'floor_id' });
Floor.hasMany(Desk, { foreignKey: 'floor_id' })

sequelize.sync()
    .then(() => {
        console.log('Veritabanı senkronizasyonu tamamlandı.');
    })
    .catch((error) => {
        console.error('Veritabanı senkronizasyonu sırasında hata oluştu:', error);
    });

module.exports = {
    Desk,
    Reservation,
    Floor
};